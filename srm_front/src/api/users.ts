import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
        const response = await axios.get(`${API_URL}/users`, {
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

export default get_users;
