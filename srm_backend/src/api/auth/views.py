from fastapi import Depends, APIRouter, status, Form
from typing import Annotated
from core import settings, Security
from core.dependencies.auth import (
    get_current_auth_user_for_refresh,
)
from infrastructure import Employee
from schemas.employee_shemas import LoginSchema, TokenInfo
from services.auth_service import get_auth_service, AuthService

router = APIRouter(prefix=settings.api_prefix.auth, tags=["Auth"])


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(
    employee_data: Annotated[LoginSchema, Form()],
    auth_service: Annotated["AuthService", Depends(get_auth_service)],
) -> TokenInfo:
    employee = await auth_service.authenticate_user(employee_data)
    access_token = Security.create_access_token(employee)
    refresh_token = Security.create_refresh_token(employee)
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post(
    "/refresh",
    response_model=TokenInfo,
    response_model_exclude_none=True,
    summary="refresh user",
    status_code=status.HTTP_200_OK,
)
async def create_new_access_token(
    current_user: Annotated[Employee, Depends(get_current_auth_user_for_refresh)],
):
    access_token = Security.create_access_token(current_user)
    return TokenInfo(
        access_token=access_token,
    )
