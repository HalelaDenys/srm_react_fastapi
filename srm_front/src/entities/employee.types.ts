export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    email: string | null;
    phoneNumber: string
    position_id: number;
    isActive: boolean;
    isAdmin: boolean;
    createdAt: string;
}

export interface IEmployeeRaw {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    patronymic: string | null;
    email: string | null;
    position_id: number;
    is_admin: boolean;
    is_active: boolean;
    created_at: string;
}

interface IPosition {
  id: number;
  name: string;
}

export interface IEmployeeWithPosition {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    email: string | null;
    phoneNumber: string
    position: IPosition;
    isActive: boolean;
    isAdmin: boolean;
    createdAt: string;
}

export interface IEmployeeCreateFormData {
    firstName: string;
    lastName: string;
    patronymic: string | null;
    phoneNumber: string;
    email: string | null;
    positionId: number;
    password: string;
    isAdmin: boolean;
}

// {
//   "first_name": "string",
//   "last_name": "string",
//   "phone_number": "string",
//   "patronymic": "string",
//   "password": "string",
//   "email": "user@example.com",
//   "is_admin": true,
//   "position_id": 0
// }