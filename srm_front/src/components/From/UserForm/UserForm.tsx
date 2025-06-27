import { useState } from "react";

interface IUserFormProps {
    onSubmit: (data: { firstName: string; lastName: string; phoneNumber: string }) => void
}


export default function UserForm({ onSubmit }: IUserFormProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                    className="w-full border mb-3 p-2 rounded"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border mb-3 p-2 rounded"
                />
            </div>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border mb-4 p-2 rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Create
            </button>
        </form>
    );
}