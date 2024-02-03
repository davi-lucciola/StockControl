from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers import product_router, stock_router


def create_app(title: str) -> FastAPI:
    app = FastAPI(title=title)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    # Routes
    app.include_router(product_router)
    app.include_router(stock_router)
    
    return app
