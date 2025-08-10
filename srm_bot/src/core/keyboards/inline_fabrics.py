from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


def inline_keyboard_builder(
    buttons: list[tuple[str, str]],
    sizes: int = 2,
) -> InlineKeyboardMarkup:
    if not buttons:
        raise ValueError("The list of buttons is empty ")

    builder = InlineKeyboardBuilder()

    for text, callback_data in buttons:
        builder.button(text=text, callback_data=callback_data)

    builder.adjust(sizes)
    return builder.as_markup()
