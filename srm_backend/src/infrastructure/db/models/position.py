from infrastructure import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import VARCHAR


class Position(Base):
    name: Mapped[str] = mapped_column(VARCHAR(50), unique=True, default="emp")

    def __repr__(self) -> str:
        return (
            f"{self.__class__.__name__}(id={self.id}, name={self.name}, "
            f"created_at={self.created_at}, updated_at={self.updated_at}"
        )
