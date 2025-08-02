import {
  fetchEmployees,
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "../api/employees";
import type { IEmployee, IEmployeeWithPosition, IEmployeeRaw, IEmployeeCreateFormData } from "../entities/employee.types";
import { cleanedFilters, transformKeysToCamelCase, transformKeysToSnakeCase } from "../utils/utils";

export const getEmployeesService = async (): Promise<IEmployee[]> => {
  const employees = await fetchEmployees();
  return employees.map(transformKeysToCamelCase) as IEmployee[];
};

export const getEmployeeByIdService = async (
  id: number
): Promise<IEmployeeWithPosition> => {
  const employee = await fetchEmployeeById(id);
  return transformKeysToCamelCase(employee) as IEmployeeWithPosition;
};

export const updateEmployeeService = async (
  id: number,
  empData: Promise<IEmployee>
) => {
  const employee = await updateEmployee(id, empData);
  return transformKeysToCamelCase(employee) as IEmployee;
};

export const createEmployeeService = async (empData: IEmployeeCreateFormData) => {
  const data = transformKeysToSnakeCase(cleanedFilters(empData)) as Promise<IEmployeeCreateFormData>;
  const employee = await createEmployee(data);
  return transformKeysToCamelCase(employee) as IEmployee;
};

export const deleteEmployeeService = async (id: number) => {
  await deleteEmployee(id);
};
