import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Role-Based Access Control (RBAC)

const CustomerPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and is an admin
  const isCustomer = userInfo && userInfo.role === "Customer";

  // Render the protected routes only if the user is logged in and is an admin
  return isCustomer ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CustomerPrivateRoute;
