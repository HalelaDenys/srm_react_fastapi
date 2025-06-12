from core.exceptions import NotFoundError, AlreadyExistsError
from infrastructure import Employee, db_helper, EmployeeRepository
from sqlalchemy.ext.asyncio import AsyncSession
from services.base_service import BaseService
from typing import AsyncGenerator
from jose import jwt
import bcrypt
import uuid
from datetime import timedelta, datetime


class EmployeeService(BaseService):
    def __init__(self, session: AsyncSession):
        self._user_repository = EmployeeRepository(session)

    async def add(self, **kwargs):
        pass

    async def update(self, **kwargs):
        pass

    async def delete(self, **kwargs):
        pass

    async def get(self, **kwargs):
        pass
