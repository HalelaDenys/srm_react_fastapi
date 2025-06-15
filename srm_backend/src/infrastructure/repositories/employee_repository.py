from infrastructure.repositories.sqlalchemy_repository import SQLAlchemyRepository
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure import Employee
from sqlalchemy import select
from typing import Sequence


class EmployeeRepository(SQLAlchemyRepository[Employee]):
    def __init__(self, session: AsyncSession):
        super().__init__(Employee, session)

    async def find_all_employees(self) -> Sequence[Employee]:
        stmt = select(self._model).order_by(self._model.id)
        result = await self._session.execute(stmt)
        return result.scalars().all()
