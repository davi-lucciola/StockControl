from http import HTTPStatus
from dataclasses import dataclass
from fastapi import Depends, HTTPException
from api.models import Product, Stock, StockRegister, StockFilter
from api.repositories import StockRepository, ProductRepository


@dataclass
class StockService:
    stock_repository: StockRepository = Depends(StockRepository)
    product_repository: ProductRepository = Depends(ProductRepository)

    async def get_all(self, filter: StockFilter) -> list[Stock]:
        stocks = self.stock_repository.find_all(filter)

        if len(stocks) == 0:
            raise HTTPException(HTTPStatus.NO_CONTENT)

        return stocks
    
    async def add_register(self, stock_register: StockRegister) -> None:
        if stock_register.quantity < 1:
            raise HTTPException(
                detail='O campo quantidade deve ser maior que zero.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )
        
        if stock_register.product_id is None:
            raise HTTPException(
                detail='O campo produto é obrigatório.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )
        
        product: Product = self.product_repository.find_by_id(stock_register.product_id)
        
        if product is None:
            raise HTTPException(
                detail='Produto não encontrado', 
                status_code=HTTPStatus.NOT_FOUND
            )

        product.amount += stock_register.quantity
        self.product_repository.save(product)
        
        stock = Stock(type='INPUT', **stock_register.model_dump())
        self.stock_repository.save_register(stock) 

    async def remove_register(self, stock_register: StockRegister):
        if stock_register.quantity < 1:
            raise HTTPException(
                detail='O campo quantidade deve ser maior que zero.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )
        
        if stock_register.product_id is None:
            raise HTTPException(
                detail='O campo produto é obrigatório.', 
                status_code=HTTPStatus.UNPROCESSABLE_ENTITY
            )

        product: Product = self.product_repository.find_by_id(stock_register.product_id)
        
        if product is None:
            raise HTTPException(
                detail='Produto não encontrado', 
                status_code=HTTPStatus.NOT_FOUND
            )
        
        if product.amount - stock_register.quantity < 0:
            raise HTTPException(
                detail='Não é possivel retirar mais do que tem no estoque.', 
                status_code=HTTPStatus.BAD_REQUEST
            )

        product.amount -= stock_register.quantity
        self.product_repository.save(product)
        
        stock = Stock(type='OUTPUT', **stock_register.model_dump())
        self.stock_repository.save_register(stock) 
