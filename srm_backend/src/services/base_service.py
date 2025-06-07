from abc import ABC, abstractmethod
from typing import Generic, TypeVar
from schemas.baseschema import BaseSchema

T = TypeVar("T")
CreateShema = TypeVar("CreateShema", bound=BaseSchema)
UpdateShema = TypeVar("UpdateShema", bound=BaseSchema)


class BaseService(ABC, Generic[T, CreateShema, UpdateShema]):
    @abstractmethod
    async def create(self, data: CreateShema) -> T:
        pass

    @abstractmethod
    async def update(self, data: UpdateShema) -> T:
        pass

    @abstractmethod
    async def delete(self, **kwargs):
        pass

    @abstractmethod
    async def get(self, **kwargs) -> T:
        pass
