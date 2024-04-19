import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Damage.css";
import { Button } from "react-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import foot from "../images/Footer image.png";
import searchIcon from "../images/home/search.png";
import SideNavigation from "./incidentManagement/components/sideNavigation";
import Footer from "./incidentManagement/components/Footer";

const DamageScreen = () => {
  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className="bacgroundImage">
        <h1>Damage</h1>
        <Link to="/addincident">
          <Button>Add incident</Button>
        </Link>
        <Link to="/viewincident">
          <Button>View incident</Button>
        </Link>
      </div>

      <SideNavigation />
      <Footer />
    </div>
  );
};

export default DamageScreen;
