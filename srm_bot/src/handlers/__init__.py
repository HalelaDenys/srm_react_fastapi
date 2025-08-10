__all__ = ("main_router",)

from aiogram import Router
from .start import router as start_router


def main_router() -> Router:
    router = Router()

    router.include_router(start_router)

    return router
