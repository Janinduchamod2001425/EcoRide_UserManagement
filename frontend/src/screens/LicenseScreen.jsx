import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/License.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useAddlicenseMutation } from "../slices/licenseApiSlice";
import { logout } from "../slices/authSlice";
import { RiCarLine, RiMotorbikeLine, RiBusLine, RiTruckLine } from 'react-icons/ri';
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

const LicenseScreen = () => {

  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [address, setAddress] = useState('');
  const [dateofbirth, setDateofbirth] = useState(null);
  const [issuedate, setIssuedate] = useState(null);
  const [expiredate, setExpiredate] = useState(null);
  const [bloodgroup, setBloodgroup] = useState('');
  const [licensevehicle, setLicensevehicle] = useState([]);

  const [add, { isLoading }] = useAddlicenseMutation();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      const selectedVehicles = licensevehicle.join(', ');

      const res = await add({ name, nic, address, dateofbirth, issuedate, expiredate, bloodgroup, licensevehicle: selectedVehicles, }).unwrap();
      setLicensevehicle([]);
      toast.success('License Added Successfully', {
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
  }

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add vehicle type to the array
      setLicensevehicle([...licensevehicle, value]);
    } else {
      // Remove vehicle type from the array
      setLicensevehicle(licensevehicle.filter((vehicle) => vehicle !== value));
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

      {/* Form Implementation */}
      <div className='bacgroundImage'>
        <p className='licenseTopic'>License Details</p>

        <div className='licenseForm'>
          <Form className='licenseCard' onSubmit={submitHandler}>

            <Form.Group className='set my-2' controlId='name'>
              <Form.Label className="labelNameLi fw-bold">Full Name</Form.Label>
              <Form.Control className="textviewLi" type='text' placeholder='Enter your full name' value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='nic'>
              <Form.Label className="labelNameLi fw-bold">NIC</Form.Label>
              <Form.Control className="textviewLi" type='text' placeholder='Enter your nic' value={nic} onChange={(e) => setNic(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='address'>
              <Form.Label className="labelNameLi fw-bold">Address</Form.Label>
              <Form.Control className="textviewLi" type='text' placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='dateofbirth'>
              <Form.Label className="labelNameLi fw-bold">Date of Birth</Form.Label>
              <Form.Control className="textviewLi" type='date' value={dateofbirth} onChange={(e) => setDateofbirth(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='issuedate'>
              <Form.Label className="labelName0 fw-bold">Issue Date</Form.Label>
              <Form.Control className="textview0" type='date' value={issuedate} onChange={(e) => setIssuedate(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='expiredate'>
              <Form.Label className="labelName10 fw-bold">Expire Date</Form.Label>
              <Form.Control className="textview10" type='date' value={expiredate} onChange={(e) => setExpiredate(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group className='set my-2' controlId='bloodgroup'>
              <Form.Label className="labelName2 fw-bold">Blood Group</Form.Label>
              <Form.Control className="textview2" type='text' placeholder='Enter your blood Group' value={bloodgroup} onChange={(e) => setBloodgroup(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='licensevehicle' className='checkBoxes'>
              <Form.Label className='labelName3 fw-bold'>Licensed Vehicles</Form.Label>
              <div>
                <Form.Check
                  inline
                  type='checkbox'
                  label={<><RiCarLine /> Car</>}
                  value='Car'
                  checked={licensevehicle.includes('Car')}
                  onChange={handleCheckboxChange}
                  className='checkbox1'
                /> <br />
                <Form.Check
                  inline
                  type='checkbox'
                  label={<><RiMotorbikeLine /> Motor-Bicycle</>}
                  value='Motor-Bicycle'
                  checked={licensevehicle.includes('Motor-Bicycle')}
                  onChange={handleCheckboxChange}
                  className='checkbox2'
                /> <br />
                <Form.Check
                  inline
                  type='checkbox'
                  label={<><RiBusLine /> Bus</>}
                  value='Bus'
                  checked={licensevehicle.includes('Bus')}
                  onChange={handleCheckboxChange}
                  className='checkbox3'
                /> <br />
                <Form.Check
                  inline
                  type='checkbox'
                  label={<><RiTruckLine /> Three-Wheeler</>}
                  value='Three-Wheeler'
                  checked={licensevehicle.includes('Three-Wheeler')}
                  onChange={handleCheckboxChange}
                  className='checkbox4'
                />
              </div>
            </Form.Group>

            {isLoading ? (
              <Loader />
            ) : (
              <Button type='submit' variant='primary' id='LicenseBTN'>Submit License</Button>
            )}

          </Form>

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

export default LicenseScreen;