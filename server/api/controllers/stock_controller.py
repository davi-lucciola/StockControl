from fastapi import APIRouter, Depends 
from api.models import StockOut, StockRegister, StockFilter
from api.services import StockService


router = APIRouter(prefix='/stock', tags=['Controle de Estoque'])


@router.get('/history')
async def search(
    filter: StockFilter = Depends(),
    stock_service: StockService = Depends(StockService)
) -> list[StockOut]:
    stocks = await stock_service.get_all(filter)
    return [StockOut(stock) for stock in stocks]

@router.post('/in')
async def input(
    stock_register: StockRegister, 
    stock_service: StockService = Depends(StockService)
) -> dict:
    await stock_service.add_register(stock_register)
    return {'detail': 'Produtos adicionados ao estoque com sucesso.'}

@router.delete('/out')
async def output(
    stock_register: StockRegister, 
    stock_service: StockService = Depends(StockService)
) -> dict:
    await stock_service.remove_register(stock_register)
    return {'detail': 'Produtos retirados do estoque com sucesso.'}
