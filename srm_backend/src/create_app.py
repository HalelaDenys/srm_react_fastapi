from fastapi.responses import ORJSONResponse
from typing import AsyncGenerator
from fastapi import FastAPI
from infrastructure import db_helper


async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    yield
    await db_helper.dispose()


def create_app():
    app = FastAPI(
        lifespan=lifespan,
        title="srmAPI",
        default_response_class=ORJSONResponse,
    )

    return app
