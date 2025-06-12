from services.auth_service import AuthService, get_auth_service
from core import (
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    FORBIDDEN_EXC_INACTIVE,
    FORBIDDEN_EXC_NOT_ENOUGH_RIGHTS,
)
from typing import Annotated
from fastapi import Depends
from infrastructure import Employee


def get_current_auth_user(
    auth_service: Annotated["AuthService", Depends(get_auth_service)],
):
    return auth_service.get_auth_user_from_token_of_type(ACCESS_TOKEN)


def get_current_auth_user_for_refresh(
    auth_service: Annotated["AuthService", Depends(get_auth_service)],
):
    return auth_service.get_auth_user_from_token_of_type(REFRESH_TOKEN)


def check_user_is_active(
    employee: Annotated[Employee, Depends(get_current_auth_user)],
) -> bool:
    if not employee.is_active:
        raise FORBIDDEN_EXC_INACTIVE
    return True


def check_user_is_admin(
    employee: Annotated[Employee, Depends(get_current_auth_user)],
) -> bool:
    if not employee.is_admin:
        raise FORBIDDEN_EXC_NOT_ENOUGH_RIGHTS
    return True
