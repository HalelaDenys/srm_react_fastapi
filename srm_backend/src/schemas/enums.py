from enum import Enum


class EmployeePosition(str, Enum):
    manager = "manager"
    painter = "painter"
    accountant = "accountant"
    mechanic = "mechanic"
