import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ValidatedInput from "../../../components/ValidatedInput/ValidatedInput";
import ConfirmDeleteModal from "../../../components/Modals/ConfirmDeleteModal/ConfirmDeleteModal";
import useUserForm from "../../../hooks/userHooks/useUserForm";
import useUpdateUserForm from "../../../hooks/userHooks/useUpdateUserForm";
import useDeleteUserHandler from "../../../hooks/userHooks/useDeleteUserHandler";

function UsersCard() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userForm, setUserForm, validationErrors, setValidationErrors, isLoading, error, userData } = useUserForm(userId);
  const { handleSubmit, isUpdating } = useUpdateUserForm(userData ?? null, userForm, setValidationErrors);
  const { handleDelete, isDeleting } = useDeleteUserHandler(() => {
    setIsModalOpen(false);
    navigate("/users");
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Помилка: {(error as Error).message}</p>;
  if (!userForm) return <p>Немає даних користувача</p>;

  const isChanged = JSON.stringify(userData) !== JSON.stringify(userForm);
  const date = new Date(userData!.createdAt!);
  const formatted = date.toLocaleString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });


  return (
    <div>
      <h1>Користувач ID: {id}</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-gray-300 p-4">
          <div>
            <ValidatedInput
              label="Ім'я: "
              name="first_name"
              value={userForm.firstName}
              onChange={(value) => {
                setUserForm({ ...userForm, firstName: value }),
                  setValidationErrors((prev) => ({ ...prev, first_name: "" }));
              }}
              error={validationErrors.first_name}
              type="text"
            />
          </div>
          <div>
            <ValidatedInput
              label="Прізвище: "
              name="last_name"
              value={userForm.lastName}
              onChange={(value) => {
                setUserForm({ ...userForm, lastName: value }),
                  setValidationErrors((prev) => ({ ...prev, last_name: "" }));
              }}
              error={validationErrors.last_name}
              type="text"
            />
          </div>
          <div>

            <ValidatedInput
              label="Телефон: "
              name="phone_number"
              value={userForm.phoneNumber}
              error={validationErrors.phone_number}
              onChange={(val) => {
                setUserForm({ ...userForm, phoneNumber: val });
                setValidationErrors((prev) => ({ ...prev, phone_number: "" }));
              }}
            />

          </div>
          <div>
            <ValidatedInput
              label="Активний: "
              name="is_active"
              type="checkbox"
              checked={userForm.isActive}
              onChange={(val) =>
                setUserForm({ ...userForm, isActive: val === "true" })
              }
            />
          </div>
          <div className="mt-2">
            <span>Створено: {formatted}</span>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          {isChanged && (
            <button
              type="submit"
              disabled={isUpdating}
              className="mr-2 px-4 py-2 bg-purple-600 text-white 
      rounded hover:bg-purple-800 transition duration-300 ease-in-out disabled:opacity-50"
            >
              Update
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={isDeleting}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Видалити
          </button>
        </div>
      </form>
      <ConfirmDeleteModal
        id={userId}
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDelete}
      />
    </div>
  );
}

export default UsersCard;
