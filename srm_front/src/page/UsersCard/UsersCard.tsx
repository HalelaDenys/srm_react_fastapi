import { useParams } from "react-router-dom";

function UsersCard() {
    const { id } = useParams();

    return (
        <div>
            <h1>Користувач ID: {id}</h1>
            {/* Далі можна фетчити дані або виводити деталі */}
        </div>
    );
}

export default UsersCard;