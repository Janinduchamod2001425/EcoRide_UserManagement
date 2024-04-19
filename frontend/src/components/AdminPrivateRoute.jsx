import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Role-Based Access Control (RBAC) 

const AdminPrivateRoute = () => {
  
    const { userInfo } = useSelector((state) => state.auth); 

    // Check if user is logged in and is an admin
    const isAdmin = userInfo && userInfo.role === 'Admin';
  
    // Render the protected routes only if the user is logged in and is an admin
    return isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
};

export default AdminPrivateRoute;
