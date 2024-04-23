import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Damage.css";
import { Button, Col, Row } from "react-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import foot from "../images/Footer image.png";
import searchIcon from "../images/home/search.png";
import SideNavigation from "./incidentManagement/components/sideNavigation";
import Footer from "./incidentManagement/components/Footer";
import dashboardBG from "../images/dashboard/userDashboard.png";
import profile from "../images/dashboard/Man 1.png";
import ownvehi from "../images/dashboard/Keys Holder 1.png";
import styles from "./incidentManagement/css/incident.module.css";
import { useSelector, useDispatch } from "react-redux";

const DamageScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const renderContent = () => {
    if (userInfo.role === "Customer") {
      return (
        <div className={styles.dashboardBackground}>
          <div className="dashboard">
            <img src={dashboardBG} className="dashboardImage" />
          </div>
          <p className="dashTitle">Incident Management</p>

          <br />
          <br />
          <div>
            <Row style={{ width: "50%" }}>
              <Col>
                <Link to="/addincident">
                  <div className={styles.dashboardButtonContainer}>
                    <img src={profile} className={styles.buttonImage} />
                  </div>
                </Link>
              </Col>
              <Col>
                <Link to="/viewincident">
                  <div className={styles.dashboardButtonContainer}>
                    <img src={ownvehi} className={styles.buttonImage} />
                  </div>
                </Link>
              </Col>
            </Row>
            <Row style={{ width: "50%" }}>
              <Col>
                <p className={styles.dashobordButtonText}>Add new incident</p>
              </Col>
              <Col>
                <p className={styles.dashobordButtonText}>View Incident</p>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else if (userInfo.role === "Admin") {
      return (
        <div className={styles.dashboardBackground}>
          <div className="dashboard">
            <img src={dashboardBG} className="dashboardImage" />
          </div>
          <p className="dashTitle">Incident Management</p>

          <br />
          <br />
          <div>
            <Row>
              <Col>
                <Link to="/viewallincidentdata">
                  <div className={styles.adminDashboardButtonContainer}>
                    <img src={ownvehi} className={styles.adminButtonImage} />
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className={styles.adminDashobordButtonText}>
                  View Incident data
                </p>
              </Col>
            </Row>
          </div>
        </div>
      );
    } else {
      return null; // For other user roles or no user
    }
  };

  return (
    <div className="py-5">
      <div className="searchbar">
        <img src={searchIcon} className="search_icon" />
      </div>
      {renderContent()}
      <SideNavigation />
      <Footer />
    </div>
  );
};

export default DamageScreen;
