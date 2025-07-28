from core import settings
from fastapi import APIRouter, Depends, status
from schemas.position_shemas import ReadPositionSchema
from services.positiion_service import get_position_service, PositionService
from core.dependencies.auth import check_user_is_admin
from typing import Annotated


router = APIRouter(
    prefix=settings.api_prefix.positions,
    tags=["Positions"],
)


@router.get("", status_code=status.HTTP_200_OK)
async def get_positions(
    position_service: Annotated["PositionService", Depends(get_position_service)],
    is_admin: Annotated[bool, Depends(check_user_is_admin)],
) -> list[ReadPositionSchema]:
    return await position_service.get_all()
