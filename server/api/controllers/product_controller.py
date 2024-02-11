from http import HTTPStatus
from fastapi import APIRouter, HTTPException, Depends 
from api.models import Product, ProductBase, ProductFilter
from api.repositories import ProductRepository


router = APIRouter(prefix='/product', tags=['Produtos'])


@router.get('/')
async def search(
    filter: ProductFilter = Depends(), 
    product_repository: ProductRepository = Depends(ProductRepository)
) -> list[Product]:
    '''
    Endpoint para pesquisar produtos dado um filtro.
    '''
    products: list[dict] = product_repository.find_all(filter)

    if len(products) == 0:
        raise HTTPException(HTTPStatus.NO_CONTENT)

    return products

@router.post('/')
async def create(product: ProductBase, product_repository: ProductRepository = Depends(ProductRepository)):
    '''
    Endpoint para criar novos produtos.
    '''
    if product_repository.find_by_name(product.name.capitalize()) is not None:
        raise HTTPException(detail='Esse produto já está cadastrado.', status_code=HTTPStatus.BAD_REQUEST)
    
    created_id: int = product_repository.create(product)
    return {'detail': 'Produto criado com sucesso.', 'createdId': created_id}

@router.put('/{id}')
async def update(id: int, product: ProductBase, product_repository: ProductRepository = Depends(ProductRepository)):
    '''
    Endpoint para alterar produtos existentes dado o seu identificador.
    '''
    if product_repository.find_by_id(id) is None:
        raise HTTPException(detail='Produto não encontrado', status_code=HTTPStatus.NOT_FOUND)
    
    product = Product(id=id, **product.model_dump())
    updated_id: int = product_repository.update(product)
    return {'detail': 'Produto atualizado com sucesso.', 'updatedId': updated_id}

@router.delete('/{id}')
async def delete(id: int, product_repository: ProductRepository = Depends(ProductRepository)):
    '''
    Endpoint para remover produtos existentes dado o seu identificador.
    '''
    if product_repository.find_by_id(id) is None:
        raise HTTPException(detail='Produto não encontrado', status_code=HTTPStatus.NOT_FOUND)
    
    product_repository.delete(id)
    return {'detail': 'Produto excluido com sucesso.'}
