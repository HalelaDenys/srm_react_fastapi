from fastapi import APIRouter
from core.config import settings
from api.auth.views import router as auth_router
from api.employees.views import router as employees_router
from api.users.views import router as users_router

api_router = APIRouter(prefix=settings.api_prefix.api_v1)
api_router.include_router(auth_router)
api_router.include_router(employees_router)
api_router.include_router(users_router)
