import { useState, useEffect } from "react";
import get_users, { type IUser } from "../../api/users";
import ContentItem from "../../components/ContentItem/ContentItem";
// import userData from "../../data.json";

function Users() {
    const [userData, setUserData] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fatchData = async () => {
            try {
                const data = await get_users();
                setUserData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fatchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userData.length === 0) {
        return <div className="text-center">No users found.</div>;
    }

    return (
        <>
            {userData.map((user) => (
                <ContentItem
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                />
            ))}
        </>
    );
}

export default Users;
