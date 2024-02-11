from typing import TYPE_CHECKING
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from api.models import Stock


class ProductBase(SQLModel):
    name: str
    price: float = Field(ge=0)

class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    price: float
    amount: int = 0

    stocks: list['Stock'] = Relationship(back_populates='product')

class ProductFilter(SQLModel):
    name: str | None = None
    min_price: float | None = None
    max_price: float | None = None
