import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/Profile.css';
import '../styles/ProfileDarkMode.css';

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
import signUpImage from '../images/Register/Sign Up Image.png'

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const LightModeIcon = () => <FaSun className="iconbackChangeSun" />;
    const DarkModeIcon = () => <FaMoon className="iconbackChangeMoon" />;

    const modeIcon = darkMode ? <LightModeIcon /> : <DarkModeIcon />;

    const roles = ["Customer", "Vehicle Owner", "Driver", "Admin"];

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date());

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setContact(userInfo.contact);
        setRole(userInfo.role);
    }, [userInfo.setName, userInfo.setEmail, userInfo.setContact, userInfo.setRole]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                contact,
                password,
                role
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile Updated', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                style: {
                    backgroundColor: "#c4f9a9",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "monospace"
                }
            });
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                style: {
                    backgroundColor: "#ffd5cc",
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontFamily: "monospace"
                }
            });
        }
    };

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

            <Button onClick={toggleDarkMode} className="toggle-dark-mode">
                {modeIcon}
            </Button>


            <div className={`bacgroundImage2 ${darkMode ? 'dark-mode' : ''}`}>
                <div className='signUpBG'><img src={signUpImage} className="signUImage" /></div>
                <div className={`signUpForm ${darkMode ? 'signUpFormDark' : ''}`}>
                    <p className='formTitle'>User Profile</p>

                    <Form onSubmit={submitHandler}>

                        <Form.Group className='set my-2' controlId='name'>
                            <Form.Label className="labelName fw-bold">Name</Form.Label>
                            <Form.Control className={`textview ${darkMode ? 'textBox' : ''}`} type='text' placeholder='Enter your full Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='email'>
                            <Form.Label className="labelName fw-bold">Email Address</Form.Label>
                            <Form.Control className={`textview ${darkMode ? 'textBox' : ''}`} type='email' placeholder='Enter your valid Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='contact'>
                            <Form.Label className="labelName fw-bold">Contact No.</Form.Label>
                            <Form.Control className={`textview ${darkMode ? 'textBox' : ''}`} type='number' placeholder='Enter new phone no.' value={contact} onChange={(e) => setContact(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className='set my-2' controlId='password'>
                            <Form.Label className="labelName fw-bold">Change Password</Form.Label>
                            <InputGroup className='textview1'>
                                <Form.Control className={`textview ${darkMode ? 'textBox' : ''}`}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Set new Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroup.Text className="visiblePassword">
                                    {showPassword ? (
                                        <FiEyeOff onClick={() => setShowPassword(!showPassword)} />
                                    ) : (
                                        <FiEye onClick={() => setShowPassword(!showPassword)} />
                                    )}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='role'>
                            <Form.Label className="labelName fw-bold">Role</Form.Label>
                            <Form.Control
                                className={`textview ${darkMode ? 'textBox' : ''}`}
                                as='select'
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={userInfo.role === 'Admin'} // Disable the select if user is Admin
                            >
                                {/* Render the Admin option with 'selected' and 'disabled' attributes */}
                                <option value="Admin" disabled selected={userInfo.role === 'Admin'}>Admin</option>
                                <option value="Customer">Customer</option>
                                <option value="Vehicle Owner">Vehicle Owner</option>
                                <option value="Driver">Driver</option>
                            </Form.Control>
                        </Form.Group>

                        {role === 'Driver' && (
                            <Button
                                onClick={() => navigate('/add-license')}
                                id="licenseCard"
                            >
                                Add License
                            </Button>
                        )}

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Button
                                type="submit"
                                variant="primary"
                                className={`ProfileUpdateButton ${darkMode ? 'upButton' : ''} ${role === 'Driver' ? 'driverUpdateButton' : ''}`}
                            >
                                Update
                            </Button>
                        )}
                    </Form>
                </div>
            </div>

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

export default ProfileScreen;


