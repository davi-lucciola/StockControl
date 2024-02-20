from http import HTTPStatus
import logging
from sqlmodel import Session, col, select
from fastapi import Depends, HTTPException
from dataclasses import dataclass
from api.db import get_db
from api.models import Product, ProductFilter


@dataclass
class ProductRepository:
    db: Session = Depends(get_db)
    
    def find_all(self, filter: ProductFilter) -> list[Product]:
        stmt = select(Product)
        
        if filter.name is not None:
            stmt = stmt.where(col(Product.name).contains(filter.name.strip().title()))

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

    def save(self, product: Product) -> Product:        
        try:
            if product.id is None:
                self.db.add(product)
            self.db.commit()
            return product
        except Exception as err:
            logging.error(err)
            raise HTTPException(
                detail='Não foi possivel salvar o produto.', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
            
    def delete(self, product: Product) -> None:
        try:
            self.db.delete(product)
            self.db.commit()
        except Exception as err:
            logging.error(err)
            raise HTTPException(
                detail='Não foi possivel excluir o produto.', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
