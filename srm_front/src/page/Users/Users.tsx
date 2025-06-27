import { useState } from "react";
import { get_users, delete_user, create_user } from "../../api/users";
import ContentItem from "../../components/ContentItem/ContentItem";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ModalWnd from "../../components/ModalWnd/ModalWnd";
import UserForm from "../../components/From/UserForm/UserForm";

function Users() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { isLoading, data: userData = [], error } = useQuery({
        queryKey: ["users"],
        queryFn: get_users,
    })

    const deleteMutation = useMutation({
        mutationFn: delete_user,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    const createMutation = useMutation({
        mutationFn: create_user,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });


    const handleCreateUser =  (data: { firstName: string; lastName: string; phoneNumber: string }) => {
        createMutation.mutate(data);
        setIsModalOpen(false);
    }

    if (isLoading) return "Loading..."

    if (error) return 'An error has occurred: ' + error.message

    if (userData.length === 0) {``
        return <div className="text-center">No users found.</div>;
    }

    return (
        <div>
            <div className="flex justify-center">
                <button className="mb-1 p-1.5 text-white hover:text-purple-700
                transition duration-300 ease-in-out"
                    onClick={() => setIsModalOpen(true)}>Create New User
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
            content={<UserForm onSubmit={handleCreateUser}/>}
            />
        </div>
    );
}

export default Users;
