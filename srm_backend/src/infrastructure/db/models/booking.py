from infrastructure import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Date, Time
from datetime import date, time
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from infrastructure import User, Service


class Booking(Base):
    __tablename__ = "booking"

    service_id: Mapped[int] = mapped_column(
        ForeignKey("services.id", ondelete="CASCADE"), primary_key=True
    )
    booking_date: Mapped[date] = mapped_column(Date, nullable=False)
    start_date: Mapped[time] = mapped_column(Time, nullable=False)
    end_date: Mapped[time] = mapped_column(Time, nullable=False)
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET DEFAULT"), nullable=True, default=None
    )
    telegram_id: Mapped[Optional[int]] = mapped_column(nullable=True, default=None)
    is_verified: Mapped[bool] = mapped_column(
        default=False, nullable=False, server_default="False"
    )

    user: Mapped[Optional["User"]] = relationship(
        "User",
        back_populates="bookings",
    )
    service: Mapped["Service"] = relationship(
        "Service",
        back_populates="bookings",
    )

    def __repr__(self) -> str:
        return (
            f"{self.__class__.__name__}(id={self.id}, service_id={self.service_id}, "
            f"booking_date={self.booking_date}, start_date={self.start_date}, "
            f"end_date={self.end_date}, user_id={self.user_id}, "
            f"telegram_id={self.telegram_id})"
            f"created_at={self.created_at}, updated_at={self.updated_at})"
        )
