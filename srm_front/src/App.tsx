import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FilterItem from "./components/FilterItem/FilterItem";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen  relative">
      <button
        className="md:hidden absolute top-7 left-4 z-80 bg-gray-800 p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Основний контент */}
      <main className="flex-1 p-6 bg-gray-400">
        <h1 className="text-center font-bold text-3xl">SRM</h1>
        <FilterItem />
      </main>
    </div>
  );
}

export default App;
