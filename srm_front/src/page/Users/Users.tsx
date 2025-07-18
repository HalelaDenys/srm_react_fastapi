import type { IUserCreateFormData, UserQueryParams } from "../../entities/user.types";
import UserFilter from "../../components/Filters/UserFilter/UserFilter";
import { useCreateUser } from "../../hooks/userHooks/useCreateUser";
import ContentItem from "../../components/ContentItem/ContentItem";
import { useUserFilterStore } from "../../store/userFilter.store";
import ModalWnd from "../../components/Modals/ModalWnd/ModalWnd";
import UserForm from "../../components/Form/UserForm/UserForm";
import { transformKeysToSnakeCase } from "../../utils/utils";
import { useUsers } from "../../hooks/userHooks/useUsers";
import { currentUserId } from "../../utils/auth";
import styles from "../Page.module.css";
import { useState } from "react";

function Users() {
  const userId = currentUserId();
  const filters = useUserFilterStore((state) => state.getUserFilters(userId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = transformKeysToSnakeCase(filters) as UserQueryParams;
  const { data: userData = [], isLoading, error } = useUsers(params);
  const createUserMutation = useCreateUser();

  const handleSubmit = (data: IUserCreateFormData) => {
    createUserMutation.mutate(data);
    setIsModalOpen(false);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (userData.length === 0 && filters.search.length === 0) {
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
      <UserFilter />
      <div className="flex justify-center">
        <button className={styles["btn"]} onClick={() => setIsModalOpen(true)}>
          Create New User
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        {userData.map((user) => (
          <ContentItem
            key={user.id}
            id={user.id}
            title={user.firstName + " " + user.lastName}
            endpoint="users"
            createdAt={user.createdAt}
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
