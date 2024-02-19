from fastapi import APIRouter, Depends 
from api.models import Product, ProductBase, ProductFilter
from api.services import ProductService


router = APIRouter(prefix='/product', tags=['Produtos'])


@router.get('/')
async def search(
    filter: ProductFilter = Depends(), 
    product_service: ProductService = Depends(ProductService)
) -> list[Product]:
    products = await product_service.get_all(filter)
    return products

@router.post('/')
async def create(product: ProductBase, product_service: ProductService = Depends(ProductService)):
    product_created: Product = await product_service.create(product)
    return {'detail': 'Produto criado com sucesso.', 'createdId': product_created.id}

@router.put('/{id}')
async def update(id: int, product: ProductBase, product_service: ProductService = Depends(ProductService)):
    await product_service.update(id, product)
    return {'detail': 'Produto atualizado com sucesso.'}

@router.delete('/{id}')
async def delete(id: int, product_service: ProductService = Depends(ProductService)):
    await product_service.delete(id)
    return {'detail': 'Produto excluido com sucesso.'}
