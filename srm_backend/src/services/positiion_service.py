from infrastructure import PositionRepository, Position, db_helper
from schemas.position_shemas import ReadPositionSchema
from sqlalchemy.ext.asyncio import AsyncSession
from services.base_service import BaseService
from core.exceptions import NotFoundError
from typing import AsyncGenerator


class PositionService(BaseService):
    def __init__(self, session: AsyncSession):
        self._position_repository = PositionRepository(session)

    async def add(self, **kwargs):
        pass

    async def update(self, **kwargs):
        pass

    async def delete(self, **kwargs):
        pass

    async def get(self, **kwargs) -> Position:
        if not (position := await self._position_repository.find_single(**kwargs)):
            raise NotFoundError("Position not found")
        return position

    async def get_all(self) -> list[ReadPositionSchema]:
        positions = await self._position_repository.find_all()
        return [ReadPositionSchema(**position.to_dict()) for position in positions]


async def get_position_service() -> AsyncGenerator[PositionService, None]:
    async with db_helper.get_session() as session:
        yield PositionService(session)
