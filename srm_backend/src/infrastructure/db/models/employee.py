from infrastructure import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import VARCHAR, Enum
from schemas.enums import EmployeePosition


class Employee(Base):
    first_name: Mapped[str] = mapped_column(VARCHAR(50), nullable=False)
    last_name: Mapped[str] = mapped_column(VARCHAR(50), nullable=False)
    patronymic: Mapped[str] = mapped_column(VARCHAR(50), nullable=True)
    email: Mapped[str] = mapped_column(VARCHAR(50), nullable=True)
    phone_number: Mapped[str] = mapped_column(VARCHAR(50), nullable=False, unique=True)
    position: Mapped[EmployeePosition] = mapped_column(
        Enum(EmployeePosition, name="employee_position_enum"),
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(default=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    password: Mapped[str] = mapped_column(VARCHAR(50), nullable=True)

    def __repr__(self):
        return (
            f"{self.__class__.__name__}(id={self.id}, is_active={self.is_active}, "
            f"is_admin={self.is_admin}, phone_number={self.phone_number}"
        )
