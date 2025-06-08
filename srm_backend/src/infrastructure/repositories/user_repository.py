from typing import Sequence

from infrastructure.repositories.sqlalchemy_repository import SQLAlchemyRepository
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure import User
from sqlalchemy import select


class UserRepository(SQLAlchemyRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def find_all_users(self) -> Sequence[User]:
        stmt = select(self._model).order_by(self._model.id)
        result = await self._session.execute(stmt)
        return result.scalars().all()
