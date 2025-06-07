import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <nav
      className={`
                ${styles["Sidebar-wrapper"]}
                ${isOpen ? "translate-x-0 bg-gray-800/90" : "-translate-x-full"}
            `}
    >
      <button
        onClick={onClose}
        className={styles["closeSidebar"]}
        aria-label="Close sidebar"
      >
        X
      </button>
      <aside>
        <h2 className={styles["h2-style"]}>HOME</h2>
        <NavLink to="/users" className={styles["btn"]}>
          Користувачі
        </NavLink>
        <NavLink to="/" className={styles["btn"]}>
          Процедури
        </NavLink>
        <NavLink to="/" className={styles["btn"]}>
          Тренажерний зал
        </NavLink>
        <NavLink to="/" className={styles["btn"]}>
          Басейн
        </NavLink>
        <NavLink to="/" className={styles["btn"]}>
          Профіль
        </NavLink>
      </aside>
    </nav>
  );
};

export default Sidebar;
