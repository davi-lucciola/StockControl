from http import HTTPStatus
from fastapi import FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .controllers import product_router, stock_router


def create_app(title: str) -> FastAPI:
    app = FastAPI(title=title)

    @app.exception_handler(RequestValidationError)
    async def http_exception_accept_handler(
        request: Request, 
        exc: RequestValidationError
    ) -> Response:
        raw_errors = exc.errors()
        print(raw_errors)
        overwritten_errors = raw_errors.errors()
        return JSONResponse(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            content={"detail": jsonable_encoder(overwritten_errors)},
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
