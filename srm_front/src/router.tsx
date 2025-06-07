import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "./App";
import Home from "./page/Home/Home";
import Users from "./page/Users/Users";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={ <App /> }>
            <Route index element={ <Home />} />
            <Route path="users" element={ <Users />} />
        </Route>
    )
);


export default router;