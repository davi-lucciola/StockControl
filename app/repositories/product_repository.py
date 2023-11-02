from functools import reduce
from fastapi import Depends
from tinydb import Query
from dataclasses import dataclass
from app.database import db, Table
from app.models import Product, ProductFilter



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
        
        return [Product(**product) for product in products]
    
    def find_by_name(self, name: str) -> dict | None:
        ProductQuery = Query()
        return self.product_table.get(ProductQuery.name == name)

    def insert(self, product: Product) -> int:
        return self.product_table.insert(product.model_dump())
