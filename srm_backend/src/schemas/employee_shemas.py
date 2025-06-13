import re

from schemas.base_schema import BaseSchema
from pydantic import Field, field_validator, EmailStr
from typing import Annotated, Optional

from schemas.user_schema import UserSchema


class LoginSchema(BaseSchema):
    phone_number: Annotated[str, Field(min_length=1, max_length=15)]
    password: Annotated[str, Field(min_length=5, max_length=30)]

    @staticmethod
    @field_validator("phone_number")
    def validate_phone_number(value: str):
        if not re.match(r"^\+\d{5,15}$", value):
            raise ValueError("Phone number must be entered in the format: +999999999")
        return value


class TokenInfo(BaseSchema):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"


class CreateEmployeeSchema(UserSchema):
    password: Annotated[str, Field(min_length=5, max_length=50)]
    email: EmailStr
    is_admin: bool
