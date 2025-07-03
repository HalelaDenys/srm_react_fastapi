import { useState } from "react";
import type { IUserFormProps } from "../../../entities/user.types";


export default function UserForm({ onSubmit }: IUserFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!phoneNumber.startsWith('+380')) {
            setError("Номер телефону повинен починатися з +380");
            return;
        }

        if (phoneNumber.length !== 13) {
            setError("Номер телефону повинен містити рівно 13 символів");
            return;
        }

        if (!/^\+380\d{9}$/.test(phoneNumber)) {
            setError("Номер повинен містити лише цифри після +380");
            return;
        }
        onSubmit({ firstName, lastName, phoneNumber });
    };




    return (
        <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border mb-3 p-2 rounded focus:outline-none focus:border-2"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border mb-3 p-2 rounded focus:outline-none focus:border-2"
                />
            </div>
            <input
                type="text"
                placeholder="+380 XX XXX XXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border mb-4 p-2 rounded focus:outline-none focus:border-2 "
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Create
            </button>
        </form>
    );
}