import axios from "axios";

interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    type: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const login = async (phoneNumber: string, password: string): Promise<ILoginResponse> => {
    const formData = new URLSearchParams();
    formData.append("phone_number", phoneNumber);
    formData.append("password", password);

    try {
        const response = await axios.post(`${API_URL}/auth/login`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
};

export default login;
