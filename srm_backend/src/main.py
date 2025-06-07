import uvicorn
from create_app import create_app

main_app = create_app()


@main_app.get("/")
async def ping():
    return {"ping": "pong"}


if __name__ == "__main__":
    uvicorn.run(main_app, host="0.0.0.0", port=8000, workers=True)
