import axios from "axios";
import isTokenExpired from "../utils/auth";

const api = axios.create({
    baseURL: import.meta.env.VITE_maleAPI_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token && isTokenExpired(token)) {
            localStorage.removeItem("token");
            window.location.href = "/login";  // просто редірект без React Router
            return Promise.reject("Token expired");
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;