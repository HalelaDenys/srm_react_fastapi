"""added the column password to employees table

Revision ID: df29181b383d
Revises: 1380640658cf
Create Date: 2025-06-12 21:48:26.383466

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "df29181b383d"
down_revision: Union[str, None] = "1380640658cf"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "employees", sa.Column("password", sa.VARCHAR(length=50), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("employees", "password")
