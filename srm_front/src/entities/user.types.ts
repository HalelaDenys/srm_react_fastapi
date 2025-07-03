
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isActive: boolean;
    createdAt: string;
}

export interface IUserRaw {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
}

export interface IUserCreateFormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface IUserFormProps {
    onSubmit: (data: IUserCreateFormData) => void
}

export interface UpdateUserInput {
  id: number;
  data: Partial<IUser>;
}