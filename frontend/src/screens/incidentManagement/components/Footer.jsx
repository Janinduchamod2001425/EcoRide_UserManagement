import React from "react";
import "../../../styles/Damage.css";
import foot from "../../../images/Footer image.png";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <img src={foot} className="foot" />
        <div className="footlinks">
          <h4 className="heading">Key Features</h4>
          <a id="footlink" href="">
            E-Vehicles
          </a>{" "}
          <br />
          <a id="footlink" href="">
            E-Vehicle Packages
          </a>{" "}
          <br />
          <a id="footlink" href="">
            Reservations
          </a>{" "}
          <br />
          <a id="footlink" href="">
            Maintenance
          </a>{" "}
          <br />
          <a id="footlink" href="">
            Damage and Incidents
          </a>{" "}
          <br />
          <a id="footlink" href="">
            Feedback and Rating
          </a>{" "}
          <br />
          <a id="footlink" href="">
            Customer Loyalty
          </a>{" "}
          <br />
        </div>
      </div>
      <h5 className="copyright"> 2024 copyright EcoRide.com</h5>
    </div>
  );
};

export default Footer;
