"""Initial tables

Revision ID: bb46aa110880
Revises:
Create Date: 2025-06-08 13:05:06.798312

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "bb46aa110880"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("first_name", sa.VARCHAR(length=50), nullable=False),
        sa.Column("last_name", sa.VARCHAR(length=50), nullable=False),
        sa.Column("phone_number", sa.VARCHAR(length=15), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_users")),
        sa.UniqueConstraint("phone_number", name=op.f("uq_users_phone_number")),
    )


def downgrade() -> None:
    op.drop_table("users")
