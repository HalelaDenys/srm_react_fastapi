from infrastructure import Employee, EmployeeRepository, db_helper
from fastapi import Depends, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.employee_shemas import LoginSchema
from core import (
    NotFoundError,
    UNAUTHORIZED_EXC_INCORRECT,
    FORBIDDEN_EXC_INACTIVE,
    UNAUTHORIZED_EXC_INVALID_TOKEN,
    Security,
)
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from typing import Annotated, AsyncGenerator
from jose import JWTError

http_bearer = HTTPBearer(auto_error=False)


def get_current_token_payload(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(http_bearer)],
) -> dict:
    token = credentials.credentials
    try:
        payload = Security.decode_token(
            token=token,
        )
    except JWTError:
        raise NotFoundError()
    return payload


class AuthService:
    def __init__(self, session: AsyncSession):
        self._user_repository = EmployeeRepository(session)

    @staticmethod
    def validate_token(payload: dict, token_type: str) -> bool | Exception:
        current_token_type = payload.get("type")
        if current_token_type == token_type:
            return True
        return HTTPException(
            status_code=401,
            detail=f"Invalid token type {current_token_type!r} expected {token_type!r}",
        )

    async def get_user_by_token_sub(
        self,
        payload: dict,
    ):
        sub: str | None = payload.get("sub")
        if user := await self._user_repository.find_single(id=int(sub)):
            return user
        raise UNAUTHORIZED_EXC_INVALID_TOKEN

    def get_auth_user_from_token_of_type(self, token_type: str):

        async def get_auth_user_from_token(
            payload: dict = Depends(get_current_token_payload),
        ) -> Employee:
            self.validate_token(payload, token_type)
            return await self.get_user_by_token_sub(payload)

        return get_auth_user_from_token

    async def authenticate_user(
        self,
        user_data: Annotated[LoginSchema, Form()],
    ) -> Employee:
        if not (
            employee := await self._user_repository.find_single(
                phone_number=user_data.phone_number
            )
        ):
            raise UNAUTHORIZED_EXC_INCORRECT

        if not Security.verify_password(
            password=user_data.password,
            hashed_password=str(employee.password),
        ):
            raise UNAUTHORIZED_EXC_INCORRECT

        if not employee.is_active:
            raise FORBIDDEN_EXC_INACTIVE

        return employee


async def get_auth_service() -> AsyncGenerator[AuthService, None]:
    async with db_helper.async_session() as session:
        yield AuthService(session=session)
