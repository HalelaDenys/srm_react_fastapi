from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder


def inline_keyboard_builder(
    buttons: list[tuple[str, str]],
    sizes: int = 2,
    back_text: str = "Back",
    back_cb: str = None,
) -> InlineKeyboardMarkup:
    if not buttons:
        raise ValueError("The list of buttons is empty")

    builder = InlineKeyboardBuilder()

    for text, callback_data in buttons:
        builder.button(text=text, callback_data=callback_data)

    if back_cb:
        builder.row(
            InlineKeyboardButton(text=back_text, callback_data=back_cb),
        )

    builder.adjust(sizes)
    return builder.as_markup()
