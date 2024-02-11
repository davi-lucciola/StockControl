from http import HTTPStatus
from fastapi import Depends, HTTPException
from dataclasses import dataclass
from sqlmodel import Session, select
from api.models import Stock, StockFilter
from api.db import get_db


@dataclass
class StockRepository:
    db: Session = Depends(get_db)

    def find_all(self, filter: StockFilter):
        stmt = select(Stock)
    
        if filter.product_id is not None:
            stmt = stmt.where(Stock.product_id == filter.product_id)

        if filter.type is not None:
            stmt = stmt.where(Stock.type == filter.type)

        if filter.min_date is not None:
            stmt = stmt.where(Stock.timestamp >= Stock.get_timestamp(filter.min_date))
            
        if filter.max_date is not None:
            stmt = stmt.where(Stock.timestamp <= Stock.get_timestamp(filter.min_date))

        stocks = self.db.exec(stmt).all()

        return stocks

    def save_register(self, stock: Stock) -> int:
        try:
            self.db.add(stock)
            self.db.commit()
            return stock.id
        except:
            raise HTTPException(
                detail='Não foi possivel adicionar movimentação de estoque', 
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR
            )
            