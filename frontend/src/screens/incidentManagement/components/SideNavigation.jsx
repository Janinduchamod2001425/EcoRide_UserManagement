import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";

import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { logout } from "../../../slices/authSlice";

import Image1 from "../../../images/sidenavbar/Dashboard.png";
import Image2 from "../../../images/sidenavbar/EVehicle.png";
import Image3 from "../../../images/sidenavbar/packages.png";
import Image4 from "../../../images/sidenavbar/Reservation.png";
import Image5 from "../../../images/sidenavbar/Maintenance.png";
import Image6 from "../../../images/sidenavbar/Damage.png";
import Image7 from "../../../images/sidenavbar/feedback.png";
import Image8 from "../../../images/sidenavbar/Loyalty.png";
import Image9 from "../../../images/sidenavbar/Delete.png";
import "../../../styles/Damage.css";

const SideNavigation = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Date
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div id="side-navbar">
      <ul>
        <div id="clock">
          <div className="time font-monospace fs-1">{currentTime}</div>
          <div className="date fs-4">{formattedDate}</div>
        </div>

        <br />
        <LinkContainer to="/dashboard">
          <li>
            <Link to="/dashboard" activeClassName="active-link" id="link">
              <img src={Image1} id="image1" />
              &nbsp;&nbsp; Dashboard
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/vehicles">
          <li>
            <Link to="/vehicles" activeClassName="active-link" id="link">
              <img src={Image2} id="image1" />
              &nbsp;&nbsp; E-Vehicles
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/packages">
          <li>
            <Link to="/packages" activeClassName="active-link" id="link">
              <img src={Image3} id="image1" />
              &nbsp;&nbsp; Packages
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/reservation">
          <li>
            <Link to="/reservation" activeClassName="active-link" id="link">
              <img src={Image4} id="image1" />
              &nbsp;&nbsp; Reservation
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/maintenance">
          <li>
            <Link to="/maintenance" activeClassName="active-link" id="link">
              <img src={Image5} id="image1" />
              &nbsp;&nbsp; Maintenace
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/incident">
          <li>
            <Link to="/incident" activeClassName="active-link" id="link">
              <img src={Image6} id="image1" />
              &nbsp;&nbsp; Incidents
            </Link>
          </li>
        </LinkContainer>

        <LinkContainer to="/feedback">
          <li>
            <Link to="/feedback" activeClassName="active-link" id="link">
              <img src={Image7} id="image1" />
              &nbsp;&nbsp; Feedback
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/loyalty">
          <li>
            <Link to="/loyalty" activeClassName="active-link" id="link">
              <img src={Image8} id="image1" />
              &nbsp;&nbsp; Loyalty Points
            </Link>
          </li>
        </LinkContainer>
        <LinkContainer to="/logout" onClick={logoutHandler}>
          <li>
            <Link to="/logout" activeClassName="active-link" id="link">
              <img src={Image9} id="image1" />
              &nbsp;&nbsp; Remove Account
            </Link>
          </li>
        </LinkContainer>
      </ul>
    </div>
  );
};

export default SideNavigation;
