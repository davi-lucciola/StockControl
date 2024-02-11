from typing import Literal
from datetime import datetime as dt
from sqlmodel import Relationship, SQLModel, Field
from api.models.product import Product


class StockRegister(SQLModel):
    quantity: int = Field(gt=0)
    product_id: int

class Stock(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    type: str
    quantity: int = Field(gt=0)
    timestamp: float = dt.timestamp(dt.utcnow())
    
    product_id: int = Field(foreign_key='product.id')
    product: Product = Relationship(back_populates='stocks')

    @staticmethod
    def get_timestamp(date_in: dt):
        return date_in.timestamp()

class StockFilter(SQLModel):
    product_id: int | None = None
    min_date: dt | None = None
    max_date: dt | None = None
    type: Literal['INPUT', 'OUTPUT'] | None = None