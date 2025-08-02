export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    email: string | null;
    phoneNumber: string
    positionId: number;
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


export interface IEmployeeWithPosition {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    email: string | null;
    phoneNumber: string
    positionId: number;
    position: string;
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

export interface IEmployeeFormProps {
    onSubmit: (data: IEmployeeCreateFormData) => void
}
