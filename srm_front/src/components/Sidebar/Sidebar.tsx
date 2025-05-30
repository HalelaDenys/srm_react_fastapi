interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <nav
      className={`
                fixed md:relative top-0 left-0 h-screen w-58 bg-gray-800 text-white flex flex-col p-4 z-40
                transform transition-transform duration-500 ease-in-out
                ${
                  isOpen ? "translate-x-0 bg-gray-800/90" : "-translate-x-full"
                } md:translate-x-0
            `}
    >
      <button
        onClick={onClose}
        className="md:hidden text-white self-end mb-4"
        aria-label="Close sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <ul>
        <h2 className="text-xl font-bold mt-6 mb-4 p-2">HOME</h2>
        <li className="mb-1.5 hover:bg-green-600 transition duration-300 p-2 rounded">
          Користувачі
        </li>
        <li className="mb-1.5 hover:bg-green-600 transition duration-300 p-2 rounded">
          Процедури
        </li>
        <li className="mb-1.5 hover:bg-green-600 transition duration-300 p-2 rounded">
          Тренажерний зал
        </li>
        <li className="mb-1.5 hover:bg-green-600 transition duration-300 p-2 rounded">
          Басейн
        </li>
        <li className="mb-1.5 hover:bg-green-600 transition duration-300 p-2 rounded">
          Профіль
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
