from tinydb import Query
from fastapi import Depends
from functools import reduce
from dataclasses import dataclass
from app.database import db, Table
from app.models import StockRegister, StockFilter


@dataclass
class StockRepository:
    stock_table: Table = Depends(lambda: db.table('stock'))

    def find_all(self, filter: StockFilter):
        queries = []
        StockQuery = Query()

        if filter.product is not None:
            queries.append(StockQuery.product.search(filter.product))

        if filter.type is not None:
            queries.append(StockQuery.type == filter.type)
        
        stocks = self.stock_table.search(reduce(lambda query1, query2: query1 & query2, queries)) \
            if len(queries) > 0 else self.stock_table.all()
        
        return [StockRegister(id=stock.doc_id, **stock) for stock in stocks]

    def save_register(self, stock_register: StockRegister) -> int:
        return self.stock_table.insert(stock_register.model_dump(exclude='id'))