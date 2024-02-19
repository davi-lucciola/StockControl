from typing import TYPE_CHECKING
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from api.models import Stock

class ProductBase(SQLModel):
    name: str
    price: float

class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    price: float
    amount: int = 0

    stocks: list['Stock'] = Relationship(
        sa_relationship_kwargs={"cascade": "delete"}, 
        back_populates='product'
    )

    def update(self, product: 'Product'):
        self.name = product.name
        self.price = product.price
        self.amount = product.amount

class ProductFilter(SQLModel):
    name: str | None = None
    min_price: float | None = None
    max_price: float | None = None
