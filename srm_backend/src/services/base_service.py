from abc import ABC, abstractmethod
from typing import Generic, TypeVar
from schemas.baseschema import BaseSchema

T = TypeVar("T")


class BaseService(ABC, Generic[T]):
    @abstractmethod
    async def add(self, **kwargs) -> T:
        pass

    @abstractmethod
    async def update(self, **kwargs) -> T:
        pass

    @abstractmethod
    async def delete(self, **kwargs):
        pass

    @abstractmethod
    async def get(self, **kwargs) -> T:
        pass
