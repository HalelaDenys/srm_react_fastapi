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
        <a
          href="/"
          className={styles["btn"]}
        >
          Користувачі
        </a>
        <a
          href="/"
          className={styles["btn"]}
        >
          Процедури
        </a>
        <a
          href="/"
          className={styles["btn"]}
        >
          Тренажерний зал
        </a>
        <a
          href="/"
          className={styles["btn"]}
        >
          Басейн
        </a>
        <a
          href="/"
          className={styles["btn"]}
        >
          Профіль
        </a>
      </aside>
    </nav>
  );
};

export default Sidebar;
