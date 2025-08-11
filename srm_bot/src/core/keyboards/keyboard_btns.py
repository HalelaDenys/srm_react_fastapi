from aiogram.types import KeyboardButton, ReplyKeyboardMarkup
from aiogram.utils.keyboard import ReplyKeyboardBuilder


services = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(text="Діаглостика"),
            KeyboardButton(text="Мийка авто"),
        ]
    ],
    resize_keyboard=True,
    one_time_keyboard=True,
    selective=True,
)
