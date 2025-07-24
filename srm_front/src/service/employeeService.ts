import {
  fetchEmployees,
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "../api/employees";
import type { IEmployee } from "../entities/employee.types";
import { transformKeysToCamelCase } from "../utils/utils";

export const getEmployeesService = async (): Promise<IEmployee[]> => {
  const employees = await fetchEmployees();
  return employees.map(transformKeysToCamelCase) as IEmployee[];
};

export const getEmployeeByIdService = async (
  id: number
): Promise<IEmployee> => {
  const employee = await fetchEmployeeById(id);
  return transformKeysToCamelCase(employee) as IEmployee;
};

export const updateEmployeeService = async (
  id: number,
  empData: Partial<IEmployee>
) => {
  const employee = await updateEmployee(id, empData);
  return transformKeysToCamelCase(employee) as IEmployee;
};

export const createEmployeeService = async (id: number, empData: any) => {
  const employee = await createEmployee(id, empData);
  return transformKeysToCamelCase(employee) as IEmployee;
};

export const deleteEmployeeService = async (id: number) => {
  await deleteEmployee(id);
};
