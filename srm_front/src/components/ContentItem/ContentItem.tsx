import styles from "./ContentItem.module.css";

interface User {
    id: number;
    firstName: string;
    secondName: string;
    age: number;
}

function ContentItem({ id, firstName, secondName, age }: User) {
    return (
        <div className={styles["content-item"]}>
            <p className="text-md font-bold">{firstName} {secondName}!</p>
            <div className="flex gap-2.5 justify-center items-center">
                <button className="cursor-pointe hover:opacity-50">🛠️</button>
                <button className="cursor-pointer hover:opacity-50">❌</button>
            </div>
        </div>
    );
}

export default ContentItem;