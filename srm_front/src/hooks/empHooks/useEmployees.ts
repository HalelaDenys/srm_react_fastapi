import type { IEmployee } from "../../entities/employee.types";
import { getEmployeesService } from "../../service/employeeService";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
  return useQuery<IEmployee[]>({
    queryKey: ["employees"],
    queryFn: () => getEmployeesService(),
    placeholderData: (prev) => prev,
    staleTime: 3600000, // 1 hour
    refetchOnWindowFocus: false, // не робити запит при фокусі вікна
  });
};