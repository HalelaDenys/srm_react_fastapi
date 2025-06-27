import api from "./instanceAPI";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isActive: boolean;
    createdAt: string;
}


const get_users = async (): Promise<IUser[]> => {
    try {
        const response = await api.get("/users", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },

        });
        const transformed: IUser[] = response.data.map((user: any) => ({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            phoneNumber: user.phone_number,
            isActive: user.is_active,
            createdAt: user.created_at,
        }));

        return transformed;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
};

const get_user_by_id = async (id: number): Promise<IUser> => {
    try {
        const response = await api.get(`/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const transformed: IUser = {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            phoneNumber: response.data.phone_number,
            isActive: response.data.is_active,
            createdAt: response.data.created_at,
        };
        return transformed;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
};

const update_user = async (id: number, data: any): Promise<IUser> => {
    try {
        const response = await api.patch(`/users/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const transformed: IUser = {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            phoneNumber: response.data.phone_number,
            isActive: response.data.is_active,
            createdAt: response.data.created_at,
        };
        return transformed;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const delete_user = async (id: number): Promise<void> => {
    try {
        await api.delete(`/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const create_user = async (userData: { firstName: string; lastName: string; phoneNumber: string }): Promise<IUser> => {
    const data = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone_number: userData.phoneNumber
    }
    try {
        const response = await api.post(`/users`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
        const transformed: IUser = {
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            phoneNumber: response.data.phone_number,
            isActive: response.data.is_active,
            createdAt: response.data.created_at,
        };
        return transformed
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { get_users, get_user_by_id, update_user, delete_user, create_user };
