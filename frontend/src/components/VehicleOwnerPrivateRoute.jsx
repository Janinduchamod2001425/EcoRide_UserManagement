import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const VehicleOwnerPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Check if user is logged in and is an admin
    const isVehicleOwner = userInfo && userInfo.role === 'Vehicle Owner';
  
    // Render the protected routes only if the user is logged in and is an admin
    return isVehicleOwner ? <Outlet /> : <Navigate to='/login' replace />;
};

export default VehicleOwnerPrivateRoute;