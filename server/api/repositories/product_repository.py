from tinydb import Query
from fastapi import Depends
from functools import reduce
from dataclasses import dataclass
from api.db import db, Table
from api.models import Product, ProductBase, ProductFilter


@dataclass
class ProductRepository:
    product_table: Table = Depends(lambda: db.table('product'))
    
    def find_all(self, filter: ProductFilter) -> list[Product]:
        queries = []
        ProductQuery = Query()

        if filter.name is not None:
            queries.append(ProductQuery.name.search(filter.name))

        if filter.min_price is not None:
            queries.append(ProductQuery.price >= filter.min_price)

        if filter.max_price is not None:
            queries.append(ProductQuery.price <= filter.max_price)
        
        products = self.product_table.search(reduce(lambda query1, query2: query1 & query2, queries)) \
            if len(queries) > 0 else self.product_table.all()
        
        return [Product(id=product.doc_id, **product) for product in products]
    
    def find_by_id(self, id: int) -> Product | None:
        product = self.product_table.get(doc_id=id)
        return Product(id=product.doc_id, **product) if product is not None else None
    
    def find_by_name(self, name: str) -> Product | None:
        ProductQuery = Query()
        product = self.product_table.get(ProductQuery.name == name)
        return Product(id=product.doc_id, **product) if product is not None else None

    def create(self, product: ProductBase) -> int:
        product.name = product.name.capitalize()
        return self.product_table.insert(product.model_dump())
    
    def update(self, product: Product) -> int:
        return self.product_table.update(product.model_dump(exclude='id'), doc_ids=[product.id])[0]
    
    def delete(self, id: int) -> None:
        self.product_table.remove(doc_ids=[id])
