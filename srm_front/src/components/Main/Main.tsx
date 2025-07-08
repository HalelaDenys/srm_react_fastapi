import FilterItem from "../FilterItem/FilterItem";
import { Outlet, useLocation } from "react-router-dom";

function Main() {
    const location = useLocation();
    // const showFilter = location.pathname !== "/";
    const isUserDetail = /^\/users\/\d+$/.test(location.pathname); // проверка, что путь вида /users/число
    const showFilter = location.pathname !== "/" && !isUserDetail;

    return (
        <main className="flex-1 p-6 bg-gray-400">
            <h1 className="text-center font-bold text-3xl">SRM</h1>
            {showFilter && <FilterItem />}
            <div className="container px-2">
                <Outlet />
            </div>
        </main>
    );
}

export default Main;