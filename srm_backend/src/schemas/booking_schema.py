from pydantic import Field, field_serializer
from schemas.base_schema import BaseSchema
from datetime import date, time, datetime
from typing import Annotated, Optional


class CreateBookingResponseSchema(BaseSchema):
    service_id: Annotated[int, Field(ge=0)]
    booking_date: Annotated[
        date, Field(description="The date the booking was created.")
    ]
    start_date: Annotated[
        time, Field(description="The date the booking was started. Format: HH-MM")
    ]
    user_id: Annotated[Optional[int], Field(ge=0)] = None
    telegram_id: Annotated[Optional[int], Field(ge=0)] = None


class CreateBookingSchema(CreateBookingResponseSchema):
    end_date: Annotated[
        Optional[time], Field(description="The date the booking was end.")
    ] = None
    is_verified: Annotated[
        Optional[bool], Field(description="Booking confirmation")
    ] = False


class ReadBookingShema(CreateBookingSchema):
    id: int
    end_date: time
    created_at: datetime
    updated_at: datetime


class ReadAvailableDateBookingSchema(BaseSchema):
    start: time
    end: time

    @field_serializer("start", "end")
    def serialize_time(self, value: time) -> str:
        return value.strftime("%H:%M")
