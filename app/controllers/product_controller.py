from http import HTTPStatus
from fastapi import APIRouter, HTTPException, Depends 
from app.models import Product, ProductFilter
from app.repositories import ProductRepository


router = APIRouter(prefix='/product', tags=['product'])


@router.get('/')
async def search(
    filter: ProductFilter = Depends(), 
    product_repository: ProductRepository = Depends(ProductRepository)
) -> list[Product]:
    products: list[dict] = product_repository.find_all(filter)

    if len(products) == 0:
        raise HTTPException(HTTPStatus.NO_CONTENT)

    return products

@router.post('/')
async def create(product: Product, product_repository: ProductRepository = Depends(ProductRepository)):
    if product_repository.find_by_name(product.name.capitalize()) is not None:
        raise HTTPException(detail='Esse produto já está cadastrado.', status_code=HTTPStatus.BAD_REQUEST)
    
    created_id: int = product_repository.insert(product)
    return {'detail': 'Produto criado com sucesso.', 'createdId': created_id}

# @router.put('/{id}')
# async def update(id):
#     pass

# @router.delete('/{id}')
# async def delete():
#     pass