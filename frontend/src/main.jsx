import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";

import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";

import ProfileScreen from "./screens/ProfileScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import EVehicleScreen from "./screens/EVehicleScreen.jsx";
import PackageScreen from "./screens/PackageScreen.jsx";
import PackageHomeScreen from "./screens/PackageHomeScreen.jsx";
import ReservationScreen from "./screens/ReservationScreen.jsx";
import MaintenanceScreen from "./screens/MaintenanceScreen.jsx";
import DamageScreen from "./screens/DamageScreen.jsx";
import FeedbackRatingScreen from "./screens/FeedbackRatingScreen.jsx";
import LoyaltyScreen from "./screens/LoyaltyScreen.jsx";

import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";
import VehicleOwnerPrivateRoute from "./components/VehicleOwnerPrivateRoute.jsx";
import AdminDashboardScreen from "./screens/AdminDashboardScreen.jsx";
import UserReport from "./screens/UserReport.jsx";

import E_CarsPage from "./pages/E_CarsPage.jsx";
import PackageDetailsScreen from "./screens/PackageDetailsScreen.jsx";
import OwnedVehiclesScreen from "./screens/OwnedVehiclesScreen.jsx";
import DriverPrivateRoute from "./components/DriverPrivateRoute.jsx";
import LicenseScreen from "./screens/LicenseScreen.jsx";
import DrivingLicenseScreen from "./screens/DrivingLicenseScreen.jsx";
import IncidentRegister from "./screens/incidentManagement/user/IncidentRegister.jsx";
import ViewIncidentData from "./screens/incidentManagement/user/ViewIncidentData.jsx";
import ViewAndEditIncidentData from "./screens/incidentManagement/user/ViewAndEditIncidentData.jsx";
import CustomerPrivateRoute from "./components/CustomerPrivateRoute.jsx";
import ViewAllIncidentData from "./screens/incidentManagement/admin/ViewAllIncidentData.jsx";
import ViewIncidentAdmin from "./screens/incidentManagement/admin/ViewIncidentDataAdmin.jsx";
import ViewIncidentDataAdmin from "./screens/incidentManagement/admin/ViewIncidentDataAdmin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* User Routes  */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      {/* Product Routes */}

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/vehicles" element={<EVehicleScreen />} />
        <Route path="/packages" element={<PackageScreen />} />
        <Route path="/packageshome" element={<PackageHomeScreen />} />
        <Route path="/packagesdetail" element={<PackageDetailsScreen />} />
        <Route path="/reservation" element={<ReservationScreen />} />
        <Route path="/maintenance" element={<MaintenanceScreen />} />
        <Route path="/feedback" element={<FeedbackRatingScreen />} />
        <Route path="/loyalty" element={<LoyaltyScreen />} />
        <Route path="/incident" element={<DamageScreen />} />

        {/* Vehicle Types */}
        <Route path="/ecars" element={<E_CarsPage />} />
      </Route>

      {/* Private Admin Routes */}
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admindashboard" element={<AdminDashboardScreen />} />
        <Route path="/usersReport" element={<UserReport />} />
        <Route path="/viewallincidentdata" element={<ViewAllIncidentData />} />
        <Route
          path="/viewincidentdata/:incidentReportId"
          element={<ViewIncidentDataAdmin />}
        />
      </Route>

      {/* Private Vehicle Owner Routes */}
      <Route path="" element={<VehicleOwnerPrivateRoute />}>
        <Route path="/ownedvehicles" element={<OwnedVehiclesScreen />} />
      </Route>

      {/* Private Driver Routes */}
      <Route path="" element={<DriverPrivateRoute />}>
        <Route path="/add-license" element={<LicenseScreen />} />
        <Route path="/driverLicense" element={<DrivingLicenseScreen />} />
      </Route>

      {/* Private CustomerRoutes */}
      <Route path="" element={<CustomerPrivateRoute />}>
        <Route path="/addincident" element={<IncidentRegister />} />
        <Route path="/viewincident" element={<ViewIncidentData />} />
        <Route
          path="/viewandeditincidentdata/:incidentReportId"
          element={<ViewAndEditIncidentData />}
        />{" "}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
