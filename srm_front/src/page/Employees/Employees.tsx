import { useState } from "react";
import ContentItem from "../../components/ContentItem/ContentItem";
import styles from "../Page.module.css";
import ModalWnd from "../../components/Modals/ModalWnd/ModalWnd";
import { useEmployees } from "../../hooks/empHooks/useEmployees";
import EmployeeCreateForm from "../../components/Form/EmployeeCreateForm/EmployeeCreateForm";
import { useCreateEmployee } from "../../hooks/empHooks/useCreateEmployee";
import type { IEmployeeCreateFormData } from "../../entities/employee.types";

function Employees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: empData = [], isLoading, error } = useEmployees();
  const createEmpMutation= useCreateEmployee();

  const handleSubmit = (data: IEmployeeCreateFormData) => {
    console.log(data);
    createEmpMutation.mutate(data);
    setIsModalOpen(false);
  };
  
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (empData.length === 0) {
    return (
      <div className="flex flex-col gap-2 mt-1">
        <div className="text-center">No users found.</div>
        <button
          onClick={() => window.location.reload()}
          className={styles["btn"]}
        >
          Update window
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <button className={styles["btn"]} onClick={() => setIsModalOpen(true)}>
          Create new employee
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        {empData.map((emp) => (
          <ContentItem
            key={emp.id}
            id={emp.id}
            title={emp.firstName + " " + emp.lastName}
            endpoint="employees"
            createdAt={emp.createdAt}
          />
        ))}
      </div>
      <ModalWnd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create new employee"
        content={<EmployeeCreateForm  onSubmit={handleSubmit}/>}
      />
    </div>
  );
}

export default Employees;
