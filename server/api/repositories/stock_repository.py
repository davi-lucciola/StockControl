from tinydb import Query
from fastapi import Depends
from functools import reduce
from dataclasses import dataclass
from api.db import db, Table
from api.models import Stock, StockFilter


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

        if filter.min_date is not None:
            queries.append(StockQuery.timestamp >= Stock.get_timestamp(filter.min_date))

        if filter.max_date is not None:
            queries.append(StockQuery.timestamp <= Stock.get_timestamp(filter.max_date))
        
        stocks: dict = self.stock_table.search(reduce(lambda query1, query2: query1 & query2, queries)) \
            if len(queries) > 0 else self.stock_table.all()
        
        stocks: list[Stock] = [
            Stock(
                id=stock.doc_id, 
                **stock
            ) 
            for stock in stocks
        ]

        return stocks

    def save_register(self, stock: Stock) -> int:
        return self.stock_table.insert(stock.model_dump(exclude='id'))