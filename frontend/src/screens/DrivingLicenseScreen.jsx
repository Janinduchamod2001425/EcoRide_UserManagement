import React, { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useGetLicenseByDriverIdMutation } from '../slices/licenseApiSlice';
import '../styles/DrivingLicense.css';
import { useLogoutMutation } from "../slices/usersApiSlice";
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

import searchIcon from '../images/home/search.png';
import sriLanka from '../images/license/sriflag.png';
import national from '../images/license/national.png';
import profile from '../images/license/profile.png';
import signature from '../images/license/Janindu Sign.png';
import chip from '../images/license/Chip Card.png';

const DrivingLicenseScreen = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const driverId = userInfo._id;

    const [getLicenseByDriverId, { data: license = [] }] = useGetLicenseByDriverIdMutation(driverId);

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

    // Display driver license information
    useEffect(() => {
        getLicenseByDriverId(driverId);
    }, [getLicenseByDriverId]);

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
                <br />
                <p className='reportTitle'>Driver License</p>
                
                <div className='drivingLicenseCard'>
                    <img src={sriLanka} alt="sri lanka flag" className='sriFlag' />
                    <p className='headerName'>DEMOCRATIC SOCIALIST REBUBLIC OF SRI LANKA</p>
                    <img src={national} alt="sri lanka flag" className='national' />
                    <br />
                    <img src={profile} className="avatarImageLicense" />
                    <img src={signature} className="signature" />
                    <p className='holder'>Holder's Signature</p>
                    <p className='sl'>SL</p>
                    <img src={chip} className="chipcard" />

                    <div className='licenseDetails'>
                        {license.map((lie) => (
                            <div key={lie._id} >
                                <p className='cardMem'>Name : {lie.name}</p>
                                <p className='cardMem'>NIC : {lie.nic}</p>
                                <p className='cardMem'>Address : {lie.address}</p>
                                <p className='cardMem'>Birth Date : {new Date(lie.dateofbirth).toLocaleDateString()}</p>
                                <p className='cardMem'>Issue Date : {new Date(lie.issuedate).toLocaleDateString()}</p>
                                <p className='cardMem'>Expire Date : {new Date(lie.expiredate).toLocaleDateString()}</p>
                                <p className='cardMem'>Blood Group : {lie.bloodgroup}</p>
                                <p className='cardMem'>Licened Vehicles : {lie.licensevehicle}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>

                </div>

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
                    <LinkContainer to='/delete' onClick={logoutHandler}>
                        <li>
                            <NavLink to='/delete' activeClassName='active-link' id='link'>
                                <img src={Image9} id='image1' />&nbsp;&nbsp; Remove Account
                            </NavLink>
                        </li>
                    </LinkContainer>
                </ul>
            </div>

        </div>
    )
}

export default DrivingLicenseScreen;