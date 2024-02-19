from http import HTTPStatus
from sqlmodel import Session, col, select
from fastapi import Depends, HTTPException
from dataclasses import dataclass
from api.db import get_db
from api.models import Product, ProductBase, ProductFilter


@dataclass
class ProductRepository:
    db: Session = Depends(get_db)
    
    def find_all(self, filter: ProductFilter) -> list[Product]:
        stmt = select(Product)
        
        if filter.name is not None:
            stmt = stmt.where(col(Product.name).contains(filter.name))

        if filter.min_price is not None:
            stmt = stmt.where(Product.price >= filter.min_price)

        if filter.max_price is not None:
            stmt = stmt.where(Product.price <= filter.max_price)
        
        products = self.db.exec(stmt).all()
        return products
    
    def find_by_id(self, id: int) -> Product | None:
        stmt = select(Product).where(Product.id == id)
        product = self.db.exec(stmt).one_or_none()
        return product
    
    def find_by_name(self, name: str) -> Product | None:
        stmt = select(Product).where(Product.name == name)
        product = self.db.exec(stmt).one_or_none()
        return product

    def create(self, product: ProductBase) -> Product:
        product.name = product.name.capitalize()
        product: Product = Product(**product.model_dump())
        
        try:
            self.db.add(product)
            self.db.commit()
            return product
        except:
            raise HTTPException(
                detail='Não foi possivel cadastrar o produto.', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
    
    def update(self, product: Product) -> int:
        product_in_db: Product = self.find_by_id(product.id)
        product_in_db.update(product)

        try:
            self.db.commit()
            return product_in_db.id
        except Exception as err:
            print(err)
            raise HTTPException(
                detail='Não foi possivel editar o produto.', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
            
    def delete(self, id: int) -> None:
        product = self.find_by_id(id)
        print(product)
        self.db.delete(product)
        try:
            self.db.commit()
        except:
            raise HTTPException(
                detail='Não foi possivel excluir o produto.', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
