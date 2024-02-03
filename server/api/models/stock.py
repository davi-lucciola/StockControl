from typing import Literal
from pydantic import BaseModel, Field
from datetime import datetime as dt, date


class StockRegister(BaseModel):
    quantity: int = Field(gt=0)
    product_id: int

class Stock(BaseModel):
    id: int | None = None
    product: str
    type: Literal['INPUT', 'OUTPUT']
    quantity: int = Field(gt=0)
    timestamp: float | dt = dt.timestamp(dt.utcnow())

    @staticmethod
    def get_timestamp(date_in: dt):
        return date_in.timestamp()

class StockFilter(BaseModel):
    product: str | None = None
    min_date: dt | None = None
    max_date: dt | None = None
    type: Literal['INPUT', 'OUTPUT'] | None = None