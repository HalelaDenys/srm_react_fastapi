from aiogram import Router, types, html, F
from aiogram.filters import CommandStart
from core import inline_keyboard_builder

router = Router()


@router.message(CommandStart())
@router.message(F.data == "start")
async def command_start_handler(message: types.Message) -> None:
    await message.answer(
        "Menu",
        reply_markup=inline_keyboard_builder(
            [("Бронювання", "create_booking"), ("Час роботи ", "work_time")]
        ),
    )
