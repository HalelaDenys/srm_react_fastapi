from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel
from typing import ClassVar
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent


class APIPrefix(BaseModel):
    api_v1: str = "/api/v1"
    users: str = "/users"


class DBConfig(BaseModel):
    naming_convention: ClassVar[dict] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_N_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
    db_url: str
    echo: bool = False
    echo_pool: bool = False
    pool_size: int = 5
    max_overflow: int = 10


class MiddlewareConfig(BaseModel):
    cors_allowed_origins: list[str]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",
    )
    db: DBConfig
    midd: MiddlewareConfig
    api_prefix: APIPrefix = APIPrefix()


settings = Settings()
