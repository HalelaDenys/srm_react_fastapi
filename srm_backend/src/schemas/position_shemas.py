from schemas.base_schema import BaseSchema
from datetime import datetime


class ReadPositionSchema(BaseSchema):
    id: int
    name: str
    created_at: datetime
