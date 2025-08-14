from core.base_client import APIClient
from core import settings


class ServiceAPI(APIClient):
    async def get_category(self) -> list[tuple[str, str]]:
        categories = await self.get("/categories")
        return [
            (category["name"], f"category:{category['id']}") for category in categories
        ]


api = ServiceAPI(base_url=settings.api.base_url)
