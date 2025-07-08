import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UsersCard from "./page/Card/UsersCard/UsersCard";
import Login from "./page/Login/Login";
import Users from "./page/Users/Users";
import Home from "./page/Home/Home";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "./App";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UsersCard />} />
            </Route>
        </>
    )
);


export default router;