import styles from "./ContentItem.module.css";
import { Link } from "react-router-dom";

interface IContentItemProps {
    id: number;
    title: string;
    endpoint: string;
    onDelete?: (id: number) => void;
}

function ContentItem({ id, title, endpoint, onDelete }: IContentItemProps) {
    return (
        <div className={styles["content-item"]} id={id.toString()}>
            <p className="text-md font-bold">{title}!</p>
            <div className="flex gap-2.5 justify-center items-center">
                <Link to={`/${endpoint}/${id}`} className="cursor-pointer hover:opacity-50">🛠️</Link>
                <button className="cursor-pointer hover:opacity-50"     
                onClick={() => onDelete?.(id)}>❌</button>
            </div>
        </div>
    );
}

export default ContentItem;