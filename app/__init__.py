from fastapi import FastAPI
from .controllers import product_router


stock_control = FastAPI()
stock_control.include_router(product_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:stock_control', reload=True)