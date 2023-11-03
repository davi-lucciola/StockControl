from typing import Literal
from pydantic import BaseModel, Field
from datetime import date, datetime as dt


class StockBase(BaseModel):
    quantity: int = Field(gt=0)
    product_id: int

date_time_dict = zip(['day', 'month', 'year'], dt.today().strftime('%d-%m-%Y').split('-'))
class StockRegister(BaseModel):
    id: int | None = None
    product: str
    type: Literal['INPUT', 'OUTPUT']
    quantity: int = Field(gt=0)
    date: dict = {time: int(value) for time, value  in date_time_dict}

class StockFilter(BaseModel):
    product: str | None = None
    type: Literal['INPUT', 'OUTPUT'] | None = None