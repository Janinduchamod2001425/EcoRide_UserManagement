import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import '../styles/Maintenance.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useCreateMutation } from "../slices/packagesApiSlice";
import { logout } from "../slices/authSlice";
import Image1 from '../images/sidenavbar/Dashboard.png';
import Image2 from '../images/sidenavbar/EVehicle.png';
import Image3 from '../images/sidenavbar/packages.png';
import Image4 from '../images/sidenavbar/Reservation.png';
import Image5 from '../images/sidenavbar/Maintenance.png';
import Image6 from '../images/sidenavbar/Damage.png';
import Image7 from '../images/sidenavbar/feedback.png';
import Image8 from '../images/sidenavbar/Loyalty.png';
import Image9 from '../images/sidenavbar/Delete.png';

import foot from '../images/Footer image.png';
import searchIcon from '../images/home/search.png';

import MaintainBG from '../images/maintenance/MaintainBG.png';

const MaintenanceScreen = () => {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

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
    <div className='py-5'>

      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      <div className='bacgroundImage'>

        <div className='backgroundImagePoster'>
          <p className='maintainTopic'>Maintenance Dashboard</p>
          <img src={MaintainBG} className="mainBG" />
        </div>
        
        <button className='btnsSetMaintain'>Get <br /> Permission <br /> 🚫 </button>
        <button className='btnsSetMaintain'>Schdule <br /> Maintenance <br /> 📃 </button>
        <button className='btnsSetMaintain'>Spare Parts <br /> Management <br /> 🔧 </button>
        <button className='btnsSetMaintain'>Access <br /> Admin Panel <br /> 🔐 </button>
      </div>

      {/* Side Navbar */}
      <div id='side-navbar'>
        <ul>
          <div id='clock'>
            <div className='time font-monospace fs-1'>
              {currentTime}
            </div>
            <div className='date fs-4'>
              {formattedDate}
            </div>
          </div>

          <br />
          <LinkContainer to='/dashboard'>
            <li>
              <Link to='/dashboard' activeClassName='active-link' id='link'>
                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/vehicles'>
            <li>
              <Link to='/vehicles' activeClassName='active-link' id='link'>
                <img src={Image2} id='image1' />&nbsp;&nbsp; E-Vehicles
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/packages'>
            <li>
              <Link to='/packages' activeClassName='active-link' id='link'>
                <img src={Image3} id='image1' />&nbsp;&nbsp; Packages
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/reservation'>
            <li>
              <Link to='/reservation' activeClassName='active-link' id='link'>
                <img src={Image4} id='image1' />&nbsp;&nbsp; Reservation
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/maintenance'>
            <li>
              <Link to='/maintenance' activeClassName='active-link' id='link'>
                <img src={Image5} id='image1' />&nbsp;&nbsp; Maintenace
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/incident'>
            <li>
              <Link to='/incident' activeClassName='active-link' id='link'>
                <img src={Image6} id='image1' />&nbsp;&nbsp; Incidents
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/feedback'>
            <li>
              <Link to='/feedback' activeClassName='active-link' id='link'>
                <img src={Image7} id='image1' />&nbsp;&nbsp; Feedback
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/loyalty'>
            <li>
              <Link to='/loyalty' activeClassName='active-link' id='link'>
                <img src={Image8} id='image1' />&nbsp;&nbsp; Loyalty Points
              </Link>
            </li>
          </LinkContainer>
          <LinkContainer to='/logout' onClick={logoutHandler}>
            <li>
              <Link to='/logout' activeClassName='active-link' id='link'>
                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
              </Link>
            </li>
          </LinkContainer>
        </ul>
      </div>

      {/* Footer */}
      <div className='footer'>
        <img src={foot} className="foot" />
        <div className='footlinks'>
          <h4 className='heading'>Key Features</h4>
          <a id='footlink' href="">E-Vehicles</a> <br />
          <a id='footlink' href="">E-Vehicle Packages</a> <br />
          <a id='footlink' href="">Reservations</a> <br />
          <a id='footlink' href="">Maintenance</a> <br />
          <a id='footlink' href="">Damage and Incidents</a> <br />
          <a id='footlink' href="">Feedback and Rating</a> <br />
          <a id='footlink' href="">Customer Loyalty</a> <br />
        </div>
      </div>
      <h5 className='copyright'> 2024 copyright EcoRide.com</h5>

    </div>
  )
}

export default MaintenanceScreen