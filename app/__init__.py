from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers import product_router, stock_router


stock_control = FastAPI()

stock_control.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Routes
stock_control.include_router(product_router)
stock_control.include_router(stock_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:stock_control', reload=True)