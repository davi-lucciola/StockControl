from http import HTTPStatus
from typing import Literal
from fastapi import APIRouter, HTTPException, Depends 
from app.models import StockBase, StockRegister, StockFilter
from app.repositories import ProductRepository, StockRepository


router = APIRouter(prefix='/stock', tags=['Controle de Estoque'])


@router.get('/history')
def search(
    filter: StockFilter = Depends(),
    stock_repository: StockRepository = Depends(StockRepository)
) -> list[StockRegister]:
    '''
    '''
    stocks = stock_repository.find_all(filter)

    if len(stocks) == 0:
        raise HTTPException(HTTPStatus.NO_CONTENT)

    return stocks

@router.post('/in')
def input(
    stock_register: StockBase, 
    stock_repository: StockRepository = Depends(StockRepository),
    product_repository: ProductRepository = Depends(ProductRepository),
) -> dict:
    product = product_repository.find_by_id(stock_register.product_id)

    if product is None:
        raise HTTPException(detail='Produto não encontrado.', status_code=HTTPStatus.NOT_FOUND)
    
    product.amount += stock_register.quantity
    product_repository.update(product)

    stock_register = StockRegister(
        product=product.name, 
        type='INPUT',
        **stock_register.model_dump(exclude='product_id')
    )
    stock_repository.save_register(stock_register)

    return {'detail': 'Produtos adicionados ao estoque com sucesso.'}

@router.delete('/out')
def output(
    stock_register: StockBase, 
    stock_repository: StockRepository = Depends(StockRepository),
    product_repository: ProductRepository = Depends(ProductRepository),
) -> dict:
    product = product_repository.find_by_id(stock_register.product_id)

    if product is None:
        raise HTTPException(detail='Produto não encontrado.', status_code=HTTPStatus.NOT_FOUND)
    
    if product.amount - stock_register.quantity < 0:
        raise HTTPException(detail='Não é possivel retirar mais do que tem no estoque.', status_code=HTTPStatus.BAD_REQUEST)

    product.amount -= stock_register.quantity
    product_repository.update(product)

    stock_register = StockRegister(
        product=product.name, 
        type='OUTPUT',
        **stock_register.model_dump(exclude='product_id')
    )
    stock_repository.save_register(stock_register)

    return {'detail': 'Produtos retirados do estoque com sucesso.'}