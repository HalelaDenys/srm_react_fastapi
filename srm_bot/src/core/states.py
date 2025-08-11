from aiogram.fsm.state import State, StatesGroup


class BookingStateForm(StatesGroup):
    services = State()
    time = State()
    phone_number = State()
