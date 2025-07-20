from infrastructure.repositories.sqlalchemy_repository import SQLAlchemyRepository
from infrastructure.db.models.employee import Employee
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select
from typing import Sequence


class EmployeeRepository(SQLAlchemyRepository[Employee]):
    def __init__(self, session: AsyncSession):
        super().__init__(Employee, session)

    async def find_all_employees(self) -> Sequence[Employee]:
        stmt = select(self._model).order_by(self._model.id)
        result = await self._session.execute(stmt)
        return result.scalars().all()

    async def find_single(self, **filters) -> Employee:
        stmt = (
            select(self._model)
            .options(joinedload(self._model.position))
            .filter_by(**filters)
            .order_by(self._model.id)
        )
        result = await self._session.execute(stmt)
        return result.scalar_one_or_none()
