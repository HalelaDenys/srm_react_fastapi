import re
from datetime import datetime

from schemas.base_schema import BaseSchema
from pydantic import Field, field_validator
from typing import Annotated, Optional


class UserSchema(BaseSchema):
    first_name: Annotated[
        str, Field(min_length=4, max_length=50, description="First name user")
    ]
    last_name: Annotated[
        str, Field(min_length=4, max_length=50, description="Last name user")
    ]
    phone_number: Annotated[
        str, Field(min_length=5, max_length=20, description="Phone number")
    ]

    @field_validator("phone_number")
    def validate_phone_number(cls, value: str) -> str:
        if not re.match(r"^\+\d{5,15}$", value):
            raise ValueError("Phone number must be entered in the format: +999999999")
        return value


class UpdateUserSchema(UserSchema):
    first_name: Annotated[
        Optional[str], Field(min_length=4, max_length=50, description="First name user")
    ] = None
    last_name: Annotated[
        Optional[str], Field(max_length=50, description="last name user")
    ] = None
    phone_number: Annotated[
        Optional[str], Field(min_length=5, max_length=20, description="Phone number")
    ] = None
    is_active: Optional[bool] = None


class ReadUserSchema(UserSchema):
    id: int
    is_active: bool
    created_at: datetime
