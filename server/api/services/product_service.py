from http import HTTPStatus
from dataclasses import dataclass
from fastapi import Depends, HTTPException
from api.models import Product, ProductBase, ProductFilter
from api.repositories import ProductRepository


@dataclass
class ProductService:
    product_repository: ProductRepository = Depends(ProductRepository)

    async def get_all(self, filter: ProductFilter):
        products: list[dict] = self.product_repository.find_all(filter)

        if len(products) == 0:
            raise HTTPException(HTTPStatus.NO_CONTENT)
        
        return products
    
    async def get_by_id(self, id: int) -> Product:
        product = self.product_repository.find_by_id(id)

        if product is None:
            raise HTTPException(
                detail='Produto não encontrado', 
                status_code=HTTPStatus.NOT_FOUND
            )
        
        return product

    async def create(self, product: ProductBase) -> Product:
        if len(product.name.strip()) == 0:
            raise HTTPException(
                detail='O campo nome é obrigatório.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )

        product_in_db: Product = self.product_repository.find_by_name(product.name.capitalize())
        if product_in_db is not None:
            raise HTTPException(
                detail='Esse produto já está cadastrado.', 
                status_code=HTTPStatus.BAD_REQUEST
            )

        return self.product_repository.create(product)
    
    async def update(self, id: int, product: ProductBase) -> None:
        if len(product.name.strip()) == 0:
            raise HTTPException(
                detail='O campo nome é obrigatório.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )

        await self.get_by_id(id)
        product_in_db: Product = self.product_repository.find_by_name(product.name.capitalize())
        if product_in_db is not None and product_in_db.id != id:
            raise HTTPException(
                detail='Esse produto já está cadastrado.', 
                status_code=HTTPStatus.BAD_REQUEST
            )

        return self.product_repository.update(Product(id=id, **product.model_dump()))
    
    async def delete(self, id: int) -> None:
        await self.get_by_id(id)
        self.product_repository.delete(id)
        
