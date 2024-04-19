import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import '../styles/Dashboard.css';

import Image1 from '../images/sidenavbar/Dashboard.png';
import Image2 from '../images/sidenavbar/EVehicle.png';
import Image3 from '../images/sidenavbar/packages.png';
import Image4 from '../images/sidenavbar/Reservation.png';
import Image5 from '../images/sidenavbar/Maintenance.png';
import Image6 from '../images/sidenavbar/Damage.png';
import Image7 from '../images/sidenavbar/feedback.png';
import Image8 from '../images/sidenavbar/Loyalty.png';
import Image9 from '../images/sidenavbar/Delete.png';

import profile from '../images/dashboard/Man 1.png';
import ownvehi from '../images/dashboard/Keys Holder 1.png';
import license from '../images/dashboard/Steering Wheel 1.png';
import reservation from '../images/dashboard/Reservation 1.png';
import packages from '../images/dashboard/Package 1.png';
import reports from '../images/dashboard/Audit 1.png';
import payments from '../images/dashboard/Credit card 2.png';
import settings from '../images/dashboard/Settings 1.png';

import tesla from '../images/dashboard/GrayTesla.png'

import searchIcon from '../images/home/search.png';
import dashboardBG from '../images/dashboard/userDashboard.png'


const DashboardScreen = () => {

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

            <div className='bacgroundImage4'>
                <div className='dashboard'><img src={dashboardBG} className="dashboardImage" /></div>
                <p className='dashTitle'>User Dashboard</p>
                
                <br />
                <br />
                <Link to='/profile'><div className='service'><img src={profile} className="serIm" /></div></Link>
                <Link to='/ownedvehicles'><div className='service1'><img src={ownvehi} className="serIm" /></div></Link>
                <Link to='/driverLicense'><div className='service1'><img src={license} className="serIm" /></div></Link>
                <Link to=''><div className='service1'><img src={reservation} className="serIm" /></div></Link>

                <p className='serv1'>Profile</p>
                <p className='serv2'>Own Vehicles</p>
                <p className='serv3'>Driving License</p>
                <p className='serv4'>Reservations</p>
                
                <Link to=''><div className='service1'><img src={packages} className="serIm" /></div></Link>
                <Link to=''><div className='service1'><img src={reports} className="serIm" /></div></Link>
                <Link to=''><div className='service1'><img src={payments} className="serIm" /></div></Link>
                <Link to='/admindashboard'><div className='service'><img src={settings} className="serIm" /></div></Link>

                <p className='serv5'>Packages</p>
                <p className='serv6'>Reports</p>
                <p className='serv7'>Payments</p>
                <p className='serv8'>System Settings <br /> (Admin Only)</p>

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
                    <LinkContainer to='/admindashboard'>
                        <li>
                            <Link to='/admindashboard' activeClassName='active-link' id='link'>
                                <img src={Image1} id='image1' />&nbsp;&nbsp; Dashboard (Ad)
                            </Link>
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

            <img src={tesla}  className="teslav" />

        </div>
    )
}

export default DashboardScreen