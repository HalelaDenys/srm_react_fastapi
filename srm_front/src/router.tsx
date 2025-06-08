import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "./App";
import Home from "./page/Home/Home";
import Users from "./page/Users/Users";
import Login from "./page/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="users" element={<Users />} />
            </Route>
        </>
    )
);


export default router;