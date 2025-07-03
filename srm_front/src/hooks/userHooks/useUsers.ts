import { useQuery } from "@tanstack/react-query";
import type { IUser } from "../../entities/user.types";
import { getUsersService } from "../../service/userService";

export const useUsers = () => {
    return useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: getUsersService,
    });
};