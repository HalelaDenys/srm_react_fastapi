import { useCreateUser } from "../../hooks/userHooks/useCreateUser";
import { useDeleteUser } from "../../hooks/userHooks/useDeleteUser";
import ContentItem from "../../components/ContentItem/ContentItem";
import UserForm from "../../components/Form/UserForm/UserForm";
import type { IUserCreateFormData } from "../../entities/user.types";
import ModalWnd from "../../components/Modals/ModalWnd/ModalWnd";
import { useUsers } from "../../hooks/userHooks/useUsers";
import { useState } from "react";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData = [], isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleSubmit = (data: IUserCreateFormData) => {
    createUserMutation.mutate(data);
    setIsModalOpen(false);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (userData.length === 0) {
    return <div className="text-center">No users found.</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="mb-1 p-1.5 text-white hover:text-purple-700
                transition duration-300 ease-in-out"
          onClick={() => setIsModalOpen(true)}
        >
          Create New User
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {userData.map((user) => (
          <ContentItem
            key={user.id}
            id={user.id}
            title={user.firstName + " " + user.lastName}
            endpoint="users"
            onDelete={handleDelete}
          />
        ))}
      </div>
      <ModalWnd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New User"
        content={<UserForm onSubmit={handleSubmit} />}
      />
    </div>
  );
}

export default Users;
