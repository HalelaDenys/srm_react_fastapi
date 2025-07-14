import { formatDateString } from "../../utils/utils";
import styles from "./ContentItem.module.css";
import { Link } from "react-router-dom";

interface IContentItemProps {
  id: number;
  title: string;
  endpoint: string;
  createdAt: string;
}

function ContentItem({ id, title, endpoint, createdAt }: IContentItemProps) {
  const formattedDate = formatDateString(createdAt);

  return (
    <div className={styles["content-item"]} id={id.toString()}>
      <div>
        <p className="text-md font-bold">{title}!</p>
        <span className="text-xs">{formattedDate}</span>
      </div>
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
