from schemas.user_schema import UserSchema, UpdateUserSchema
from pydantic import Field, field_validator, EmailStr
from schemas.base_schema import BaseSchema
from schemas.enums import EmployeePosition
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
    position: EmployeePosition


class UpdateEmployeeSchema(UpdateUserSchema):
    patronymic: Annotated[Optional[str], Field(min_length=1, max_length=50)] = None
    password: Annotated[Optional[str], Field(min_length=5, max_length=50)] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = None
    is_active: Optional[bool] = None
    position: Optional[EmployeePosition] = None


class ReadEmployeeSchema(UserSchema):
    patronymic: str | None
    email: EmailStr
    position: EmployeePosition
    is_admin: bool
    is_active: bool
    created_at: datetime
