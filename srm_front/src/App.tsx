import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import FilterItem from "./components/FilterItem/FilterItem";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen  relative ">
      <button
        className={`lg:hidden absolute top-7 left-4 z-80 bg-gray-800 p-2 rounded 
          ${sidebarOpen ? "hidden" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <img src="./menu.svg" alt="MenuIcon" className="w-5 h-5" />
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
