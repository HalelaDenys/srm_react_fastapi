from infrastructure.repositories.sqlalchemy_repository import SQLAlchemyRepository
from core.utils.datetime_utils import make_utc_datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, asc, or_
from typing import Sequence, Optional
from infrastructure import User
from datetime import date


class UserRepository(SQLAlchemyRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def find_all_users(
        self,
        sort_order: str,
        sort_by: str,
        status: str,
        search: Optional[str] = None,
        date_from: Optional[date] = None,
        date_to: Optional[date] = None,
    ) -> Sequence[User]:
        sort_column = getattr(self._model, sort_by, None)

        stmt = select(self._model).order_by(
            asc(sort_column) if sort_order == "asc" else desc(sort_column)
        )

        # Filtering by status
        if status == "is_active":
            stmt = stmt.where(self._model.is_active == True)
        elif status == "is_inactive":
            stmt = stmt.where(self._model.is_active == False)

        # Filtering by search
        if search:
            stmt = stmt.where(
                or_(
                    self._model.first_name.ilike(f"%{search}%"),
                    self._model.last_name.ilike(f"%{search}%"),
                )
            )

        # Filtering by creation date
        if date_from:
            date_from_dt = make_utc_datetime(date_from, end_of_day=True)
            stmt = stmt.where(self._model.created_at >= date_from_dt)

        if date_to:
            date_to_dt = make_utc_datetime(date_to, end_of_day=True)
            stmt = stmt.where(self._model.created_at <= date_to_dt)

        result = await self._session.execute(stmt)
        return result.scalars().all()
