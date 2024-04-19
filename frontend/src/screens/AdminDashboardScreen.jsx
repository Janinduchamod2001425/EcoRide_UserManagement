import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import '../styles/AdminDashboard.css';

import Image1 from '../images/sidenavbar/Dashboard.png';
import Image2 from '../images/sidenavbar/EVehicle.png';
import Image3 from '../images/sidenavbar/packages.png';
import Image4 from '../images/sidenavbar/Reservation.png';
import Image5 from '../images/sidenavbar/Maintenance.png';
import Image6 from '../images/sidenavbar/Damage.png';
import Image7 from '../images/sidenavbar/feedback.png';
import Image8 from '../images/sidenavbar/Loyalty.png';
import Image9 from '../images/sidenavbar/Delete.png';

import customers from '../images/dashboard/customers.png';
import vehicleowners from '../images/dashboard/Keys Holder 1.png';
import drivers from '../images/dashboard/drivers.png';
import admins from '../images/dashboard/admins.png';
import vehicles from '../images/dashboard/vehicles.png';
import packages from '../images/dashboard/Package 1.png';
import payments from '../images/dashboard/payments.png';
import maintains from '../images/dashboard/allmaintenance.png';
import damages from '../images/dashboard/damages.png';
import feedbacks from '../images/dashboard/feedbacks.png';
import loyalty from '../images/dashboard/cusloyalty.png';
import system from '../images/dashboard/Settings 1.png';

import tesla from '../images/dashboard/GrayTesla.png'

import searchIcon from '../images/home/search.png';
import dashboardBG from '../images/dashboard/admindashBG.png'

const AdminDashboardScreen = () => {

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      <div className='bacgroundImage3'>
        <div className='dashboard'><img src={dashboardBG} className="dashboardImage" /></div>
        <p className='dashTitle'>Admin Dashboard</p>

        <br />
        <br />
        
        <Link to='/usersReport'><div className='service'><img src={customers} className="serIm" /></div></Link>
        <Link to='/usersReport'><div className='service'><img src={vehicleowners} className="serIm" /></div></Link>
        <Link to='/usersReport'><div className='service'><img src={drivers} className="serIm" /></div></Link>
        <Link to='/usersReport'><div className='service'><img src={admins} className="serIm" /></div></Link>

        <p className='ser1'>Customers</p>
        <p className='ser2'>Vehicle Owners</p>
        <p className='ser3'>Drivers</p>
        <p className='ser4'>Administrators</p>

        <div className='service'><img src={vehicles} className="serIm" /></div>
        <div className='service'><img src={packages} className="serIm" /></div>
        <div className='service'><img src={payments} className="serIm" /></div>
        <Link to=''><div className='service'><img src={maintains} className="serIm" /></div></Link>

        <p className='ser5'>Vehicle<br />Listing</p>
        <p className='ser6'>Package<br />Creation</p>
        <p className='ser7'>Reservations</p>
        <p className='ser8'>Maintenance</p>

        <div className='service'><img src={damages} className="serIm" /></div>
        <div className='service'><img src={feedbacks} className="serIm" /></div>
        <div className='service'><img src={loyalty} className="serIm" /></div>
        <Link to=''><div className='service'><img src={system} className="serIm" /></div></Link>

        <p className='ser9'>Incidents</p>
        <p className='ser10'>Feedback & <br /> Rating</p>
        <p className='ser11'>Customer Loyalty</p>
        <p className='ser12'>Settings</p>

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
              <NavLink to='/dashboard' activeClassName='active-link' id='link'>
                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/vehicles'>
            <li>
              <NavLink to='/vehicles' activeClassName='active-link' id='link'>
                <img src={Image2} id='image1' />&nbsp;&nbsp; E-Vehicles
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/packages'>
            <li>
              <NavLink to='/packages' activeClassName='active-link' id='link'>
                <img src={Image3} id='image1' />&nbsp;&nbsp; Packages
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/reservation'>
            <li>
              <NavLink to='/reservation' activeClassName='active-link' id='link'>
                <img src={Image4} id='image1' />&nbsp;&nbsp; Reservation
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/maintenance'>
            <li>
              <NavLink to='/maintenance' activeClassName='active-link' id='link'>
                <img src={Image5} id='image1' />&nbsp;&nbsp; Maintenace
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/incident'>
            <li>
              <NavLink to='/incident' activeClassName='active-link' id='link'>
                <img src={Image6} id='image1' />&nbsp;&nbsp; Incidents
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/feedback'>
            <li>
              <NavLink to='/feedback' activeClassName='active-link' id='link'>
                <img src={Image7} id='image1' />&nbsp;&nbsp; Feedback
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/loyalty'>
            <li>
              <NavLink to='/loyalty' activeClassName='active-link' id='link'>
                <img src={Image8} id='image1' />&nbsp;&nbsp; Loyalty Points
              </NavLink>
            </li>
          </LinkContainer>
          <LinkContainer to='/logout' onClick={logoutHandler}>
            <li>
              <NavLink to='/logout' activeClassName='active-link' id='link'>
                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
              </NavLink>
            </li>
          </LinkContainer>
        </ul>
      </div>
      <img src={tesla} className="tesla" />
    </div>
  )
}

export default AdminDashboardScreen