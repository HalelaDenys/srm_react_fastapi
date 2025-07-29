import type { IPosition, IPositionRaw } from "../entities/position.types"
import { getTokenFromLocalStorage } from "../utils/auth";
import api from "./instanceAPI";
import axios from "axios";

const token = getTokenFromLocalStorage();


export const fetchPositions = async (): Promise<IPositionRaw[]> => {
    try {
        const response = await api.get("/positions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.data?.detail) {
            throw error;
        }
        throw {
            type: "unknown_error",
            error,
        };
    }
}