from http import HTTPStatus
from fastapi import APIRouter, HTTPException, Depends 
from api.models import Product, Stock, StockRegister, StockFilter
from api.repositories import ProductRepository, StockRepository


router = APIRouter(prefix='/stock', tags=['Controle de Estoque'])


@router.get('/history')
def search(
    filter: StockFilter = Depends(),
    stock_repository: StockRepository = Depends(StockRepository)
) -> list[Stock]:
    '''
    '''
    stocks = stock_repository.find_all(filter)

    if len(stocks) == 0:
        raise HTTPException(HTTPStatus.NO_CONTENT)

    return stocks

@router.post('/in')
def input(
    stock_register: StockRegister, 
    stock_repository: StockRepository = Depends(StockRepository),
    product_repository: ProductRepository = Depends(ProductRepository),
) -> dict:
    product: Product = product_repository.find_by_id(stock_register.product_id)

    if product is None:
        raise HTTPException(detail='Produto não encontrado.', status_code=HTTPStatus.NOT_FOUND)
    
    product.amount += stock_register.quantity
    product_repository.update(product)

    stock = Stock(type='INPUT', **stock_register.model_dump())
    stock_repository.save_register(stock)

    return {'detail': 'Produtos adicionados ao estoque com sucesso.'}

@router.delete('/out')
def output(
    stock_register: StockRegister, 
    stock_repository: StockRepository = Depends(StockRepository),
    product_repository: ProductRepository = Depends(ProductRepository),
) -> dict:
    product: Product = product_repository.find_by_id(stock_register.product_id)

    if product is None:
        raise HTTPException(detail='Produto não encontrado.', status_code=HTTPStatus.NOT_FOUND)
    
    if product.amount - stock_register.quantity < 0:
        raise HTTPException(detail='Não é possivel retirar mais do que tem no estoque.', status_code=HTTPStatus.BAD_REQUEST)

    product.amount -= stock_register.quantity
    product_repository.update(product)

    stock = Stock(type='OUTPUT', **stock_register.model_dump())
    stock_repository.save_register(stock)

    return {'detail': 'Produtos retirados do estoque com sucesso.'}