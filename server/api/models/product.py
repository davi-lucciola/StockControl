from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    name: str
    price: float = Field(gt=0)

class Product(BaseModel):
    id: int
    name: str
    price: float
    amount: int = 0

class ProductFilter(BaseModel):
    name: str | None = None
    min_price: float | None = None
    max_price: float | None = None
