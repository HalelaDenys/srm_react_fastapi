from core import inline_keyboard_builder, BookingStateForm
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery
from aiogram import Router, F
from core.keyboards.keyboard_btns import services

router = Router()


@router.callback_query(F.data == "create_booking")
async def create_booking(call: CallbackQuery):
    await call.message.edit_text(
        "Виберіть категорію",
        reply_markup=inline_keyboard_builder(
            [
                ("Діагностика", "category:1"),
                ("Швидка робота", "category:2"),
            ]
        ),
        back_cb="start",
    )


@router.callback_query(F.data.startswith("category:"))
async def choose_category(call: CallbackQuery, state: FSMContext):
    await state.set_state(BookingStateForm.services)
    category_id = int(call.data.split(":")[1])
    services_dict = {
        1: [
            {"id": 1, "name": "Комплексная диагностика"},
            {"id": 2, "name": "Диагностика тормозов"},
        ],
        2: [
            {"id": 3, "name": "Замена масла"},
            {"id": 4, "name": "Замена фильтра"},
        ],
    }
    services_list = services_dict.get(category_id, [])

    buttons = [(s["name"], f"service:{s['id']}") for s in services_list]

    await call.message.edit_text(
        "Виберіть послугу",
        reply_markup=inline_keyboard_builder(buttons),
    )
