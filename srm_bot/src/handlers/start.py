from aiogram import Router, types, html
from aiogram.filters import CommandStart

from core import inline_keyboard_builder

router = Router()


@router.message(CommandStart())
async def command_start_handler(message: types.Message) -> None:
    await message.answer(
        f"Hello, {html.bold(message.from_user.full_name)}!",
        reply_markup=inline_keyboard_builder(
            [("Записаться", "book"), ("Отмена", "cancel")]
        ),
    )
