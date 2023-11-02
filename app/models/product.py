from pydantic import BaseModel, Field


class Product(BaseModel):
    name: str
    price: float = Field(gt=0)

class ProductFilter(BaseModel):
    name: str | None = None
    min_price: float | None = None
    max_price: float | None = None
