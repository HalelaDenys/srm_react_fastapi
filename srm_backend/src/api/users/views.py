from schemas.user_schema import UserSchema, UpdateUserSchema, ReadUserSchema
from services.user_service import get_user_service, UserService
from fastapi import Depends, APIRouter, status, Path
from core.config import settings
from typing import Annotated

router = APIRouter(prefix=settings.api_prefix.users, tags=["Users"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserSchema,
    user_service: Annotated["UserService", Depends(get_user_service)],
) -> ReadUserSchema:
    user = await user_service.add(data=user_data)
    return ReadUserSchema(**user.to_dict())


@router.get("/{user_id}", status_code=status.HTTP_200_OK)
async def get_user_by_id(
    user_id: Annotated[int, Path(ge=1)],
    user_service: Annotated["UserService", Depends(get_user_service)],
) -> ReadUserSchema:
    user = await user_service.get(id=user_id)
    return ReadUserSchema(**user.to_dict())


@router.get("", status_code=status.HTTP_200_OK)
async def get_users(
    user_service: Annotated["UserService", Depends(get_user_service)],
) -> list[ReadUserSchema]:
    return await user_service.get_all_users()


@router.patch("/{user_id}", status_code=status.HTTP_200_OK)
async def update_user(
    user_id: Annotated[int, Path(ge=1)],
    user_data: UpdateUserSchema,
    user_service: Annotated["UserService", Depends(get_user_service)],
) -> ReadUserSchema:
    user = await user_service.update(user_id=user_id, data=user_data)
    return ReadUserSchema(**user.to_dict())


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: Annotated[int, Path(ge=1)],
    user_service: Annotated["UserService", Depends(get_user_service)],
) -> None:
    await user_service.delete(user_id=user_id)
    return
