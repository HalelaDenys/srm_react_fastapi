import { Navigate } from "react-router-dom";


type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;