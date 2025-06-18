from services.employee_service import get_employee_service, EmployeeService
from fastapi import Depends, HTTPException, Form
from schemas.employee_shemas import LoginSchema
from infrastructure import Employee
from core import (
    UNAUTHORIZED_EXC_INCORRECT,
    FORBIDDEN_EXC_INACTIVE,
    UNAUTHORIZED_EXC_INVALID_TOKEN,
    Security,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    FORBIDDEN_EXC_NOT_ENOUGH_RIGHTS,
)
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from typing import Annotated
from jose import JWTError

http_bearer = HTTPBearer(auto_error=False)


def get_current_token_payload(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(http_bearer)],
) -> dict:
    if credentials is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    token = credentials.credentials
    try:
        payload = Security.decode_token(
            token=token,
        )
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return payload


def validate_token(payload: dict, token_type: str) -> bool | Exception:
    current_token_type = payload.get("type")
    if current_token_type == token_type:
        return True
    return HTTPException(
        status_code=401,
        detail=f"Invalid token type {current_token_type!r} expected {token_type!r}",
    )


async def get_user_by_token_sub(
    payload: dict,
    employee_service: "EmployeeService",
):
    sub: str | None = payload.get("sub")
    if user := await employee_service.get(id=int(sub)):
        return user
    raise UNAUTHORIZED_EXC_INVALID_TOKEN


def get_auth_user_from_token_of_type(token_type: str):

    async def get_auth_user_from_token(
        employee_service: Annotated["EmployeeService", Depends(get_employee_service)],
        payload: dict = Depends(get_current_token_payload),
    ) -> Employee:
        validate_token(payload, token_type)
        return await get_user_by_token_sub(payload, employee_service)

    return get_auth_user_from_token


async def authenticate_user(
    employee_data: Annotated[LoginSchema, Form()],
    employee_service: Annotated["EmployeeService", Depends(get_employee_service)],
) -> Employee:
    if not (
        employee := await employee_service.get(phone_number=employee_data.phone_number)
    ):
        raise UNAUTHORIZED_EXC_INCORRECT

    if not Security.verify_password(
        password=employee_data.password,
        hashed_password=str(employee.password),
    ):
        raise UNAUTHORIZED_EXC_INCORRECT

    if not employee.is_active:
        raise FORBIDDEN_EXC_INACTIVE

    return employee


get_current_auth_user = get_auth_user_from_token_of_type(ACCESS_TOKEN)
get_current_auth_user_for_refresh = get_auth_user_from_token_of_type(REFRESH_TOKEN)


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
