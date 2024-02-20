from http import HTTPStatus
from fastapi import FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .controllers import product_router, stock_router


def create_app(title: str) -> FastAPI:
    app = FastAPI(title=title)

    @app.exception_handler(Exception)
    async def generic_http_exception_handler(
        request: Request, 
        exc: Exception
    ) -> Response:
        return JSONResponse(
            status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
            content={"detail": jsonable_encoder(exc.args[0])},
        )

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
