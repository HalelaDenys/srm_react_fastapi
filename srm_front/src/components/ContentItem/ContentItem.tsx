import styles from "./ContentItem.module.css";

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

function ContentItem({ id, firstName, lastName }: User) {
    return (
        <div className={styles["content-item"]} id={id.toString()}>
            <p className="text-md font-bold">{firstName} {lastName}!</p>
            <div className="flex gap-2.5 justify-center items-center">
                <button className="cursor-pointe hover:opacity-50">🛠️</button>
                <button className="cursor-pointer hover:opacity-50">❌</button>
            </div>
        </div>
    );
}

export default ContentItem;