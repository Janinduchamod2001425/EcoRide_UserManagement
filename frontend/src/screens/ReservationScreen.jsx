import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles/Reservation.css';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useReservationMutation } from "../slices/reservationApiSlice";
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

import visaImage from '../images/cards/visatype.png';
import mastercardImage from '../images/cards/mastercardtype.png';

import PackBox from '../images/packbox.svg';

const ReservationScreen = () => {

  const [cardtype, setCardtype] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [cvv, setCvv] = useState('');

  // get Package information
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const packname = params.get('packname');
  const price = params.get('price');

  const [create, { isLoading }] = useReservationMutation();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const expiredate = `${expireMonth}/${expireYear}`;
      const res = await create({ cardtype, cardnumber, expiredate, cvv }).unwrap();
      // dispatch(setCredentials({ ...res }));
      toast.success('Payment success', {
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

  const handleMonthChange = (e) => {
    const month = e.target.value.slice(0, 2);
    setExpireMonth(month);
  };

  const handleYearChange = (e) => {
    const year = e.target.value.slice(0, 2);
    setExpireYear(year);
  };

  return (
    <div className='py-5'>

      {/* Search Bar */}
      <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div>

      {/* Form Implementation */}
      <div className='bacgroundImage'>
        <p className='reservationTopic'>Payments</p>

        <div className='paymentForm'>
          <Form className='gateway' onSubmit={submitHandler}>

            <Form.Group className='set my-2' controlId='cardnumber'>
              <Form.Label className="labelName fw-bold">Card Type</Form.Label>
              <div className="d-flex justify-content-between mb-3">
                <button className={`cardButton1 ${cardtype === 'Visa' ? 'active' : ''}`} onClick={() => setCardtype('Visa')}>
                  <img src={visaImage} alt="Visa" className='visa' />
                </button>
                <button className={`cardButton2 ${cardtype === 'Mastercard' ? 'active' : ''}`} onClick={() => setCardtype('Mastercard')}>
                  <img src={mastercardImage} alt="Mastercard" className='master' />
                </button>
              </div>
            </Form.Group>

            <Form.Group className='set my-2' controlId='cardnumber'>
              <Form.Label className="labelNameCN fw-bold">Card Number</Form.Label>
              <Form.Control className="textviewCN" type='text' placeholder='Enter Card No' value={cardnumber} onChange={(e) => setCardnumber(e.target.value)} required></Form.Control>
            </Form.Group>

            <Form.Group controlId='expiredate'>
              <Form.Label className="labelName fw-bold">Expire Date</Form.Label>
              <div className='d-flex'>
                <Form.Control className="textviewMonth"
                  type='text'
                  placeholder='MM'
                  maxLength={2}
                  value={expireMonth}
                  onChange={handleMonthChange}
                  required
                />
                <span className='mx-2'>/</span>
                <Form.Control className="textviewYear"
                  type='text'
                  placeholder='YY'
                  maxLength={2}
                  value={expireYear}
                  onChange={handleYearChange}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className='set my-2' controlId='cvv'>
              <Form.Label className="labelName fw-bold">CVV</Form.Label>
              <Form.Control className="textviewCVV" type='text' placeholder='000' value={cvv} onChange={(e) => setCvv(e.target.value)} required></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type='submit' variant='primary' id='saveBTNPay'>Pay</Button>
          </Form>

          <div className='priceBox'>
            <p className='packagename'>Package Name <br /> <span style={{fontSize: "35px", fontFamily: 'monospace', fontWeight: 'bolder'}}>{packname}</span></p>
            <p className='pricelabel'>Price <br /> <span style={{fontSize: "50px", backgroundColor: 'lime', padding: '10px', borderRadius: '20px'}}>{price}/=</span></p>
            <img src={PackBox} className="packBoxImage" />
          </div>

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

export default ReservationScreen