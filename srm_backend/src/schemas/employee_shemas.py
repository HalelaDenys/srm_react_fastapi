from infrastructure import Employee
from schemas.user_schema import UserSchema, UpdateUserSchema
from pydantic import Field, field_validator, EmailStr
from schemas.base_schema import BaseSchema
from typing import Annotated, Optional
import re
from datetime import datetime


class LoginSchema(BaseSchema):
    phone_number: Annotated[str, Field(min_length=1, max_length=15)]
    password: Annotated[str, Field(min_length=5, max_length=30)]

    @field_validator("phone_number")
    def validate_phone_number(cls, value: str) -> str:
        if not re.match(r"^\+\d{5,15}$", value):
            raise ValueError("Phone number must be entered in the format: +999999999")
        return value


class TokenInfo(BaseSchema):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"


class CreateEmployeeSchema(UserSchema):
    patronymic: Annotated[Optional[str], Field(min_length=1, max_length=50)] = None
    password: Annotated[str, Field(min_length=5, max_length=50)]
    email: EmailStr
    is_admin: bool
    position_id: Annotated[int, Field(ge=0)]


class UpdateEmployeeSchema(UpdateUserSchema):
    patronymic: Annotated[Optional[str], Field(min_length=1, max_length=50)] = None
    password: Annotated[Optional[str], Field(min_length=5, max_length=50)] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = None
    is_active: Optional[bool] = None
    position_id: Annotated[Optional[int], Field(ge=0)] = None


class ReadEmployeeSchema(UserSchema):
    patronymic: Optional[str] = None
    email: Optional[EmailStr | str] = None
    position_id: Annotated[int, Field(ge=0)]
    is_admin: bool
    is_active: bool
    created_at: datetime


class PositionReadSchema(BaseSchema):
    id: int
    name: str


class ReadEmployeeSchemaWithPosition(UserSchema):
    patronymic: Optional[str] = None
    email: Optional[EmailStr | str] = None
    position: PositionReadSchema
    is_admin: bool
    is_active: bool
    created_at: datetime


def employee_to_read_schema(employee: "Employee") -> ReadEmployeeSchemaWithPosition:
    return ReadEmployeeSchemaWithPosition(
        first_name=employee.first_name,
        last_name=employee.last_name,
        patronymic=employee.patronymic,
        email=employee.email,
        phone_number=employee.phone_number,
        position=PositionReadSchema(
            id=employee.position.id,
            name=employee.position.name,
        ),
        created_at=employee.created_at,
        is_active=employee.is_active,
        is_admin=employee.is_admin,
    )
