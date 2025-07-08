import styles from "./ContentItem.module.css";
import { Link } from "react-router-dom";

interface IContentItemProps {
  id: number;
  title: string;
  endpoint: string;
}

function ContentItem({ id, title, endpoint }: IContentItemProps) {
  return (
    <div className={styles["content-item"]} id={id.toString()}>
      <p className="text-md font-bold">{title}!</p>
      <div className="flex gap-2.5 justify-center items-center">
        <Link
          to={`/${endpoint}/${id}`}
          className="cursor-pointer hover:opacity-50"
        >
          🛠️
        </Link>
        <Link
            to={`/${endpoint}/${id}`}
          className="cursor-pointer hover:opacity-50"
        >
          ❌
        </Link>
      </div>
    </div>
  );
}

export default ContentItem;
