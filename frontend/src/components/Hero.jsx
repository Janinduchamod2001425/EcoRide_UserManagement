import React, { useEffect, useState } from 'react';
import Search from '../components/SearchBar';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom'; 
import '../styles/Hero.css';
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

import heroImage from '../images/BG/heroBG.jpeg';
import heroImage1 from '../images/BG/BG2.jpeg';
import vehicleBG from '../images/BG/vehicleBG.jpeg';
import packBG from '../images/BG/packBG.jpg';
import reservation from '../images/BG/reservation.png';
import maintain from '../images/maintenance/Maintain.png';
import damage from '../images/damages/damage.png';
import loyalty from '../images/feed/Loyaltys.png';
import foot from '../images/Footer image.png';

import searchIcon from '../images/home/search.png';

import logo1 from '../images/logos/Tesla.png';
import logo2 from '../images/logos/Audi.png';
import logo3 from '../images/logos/BMW.png';
import logo4 from '../images/logos/Renault.png';
import logo5 from '../images/logos/Ford.png';
import logo6 from '../images/logos/Hyundai.png';
import logo7 from '../images/logos/Land Rover.png';
import logo8 from '../images/logos/Volkswagen.png';

import pack1 from '../images/pack1.png';
import pack2 from '../images/pack2.png';
import pack3 from '../images/pack3.png';

import trans1 from '../images/cards/Stripe.png';
import trans2 from '../images/cards/Visa.png';
import trans3 from '../images/cards/MasterCard.png';
import trans4 from '../images/cards/Bank Cards.png';

import maint1 from '../images/maintenance/maint1.png';  
import maint2 from '../images/maintenance/maint2.png';    

import dam1 from '../images/damages/Location.png';  
import dam2 from '../images/damages/Maps.png'; 
import dam3 from '../images/damages/Hospital.png'; 

import feed1 from '../images/feed/Unlikes.png';  
import feed2 from '../images/feed/Ratings.png'; 
import feed3 from '../images/feed/Handshakes.png'; 

const Hero = () => {

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

      {/* <div className='searchbar'>
        <img src={searchIcon} className="search_icon" />
      </div> */}
      <Search />

      <div className='bacgroundImage'>
        <div className='hero_image'> 
          <img src={heroImage} className='hero'/>
        </div>

        <div className='hero_image1'> 
          <img src={heroImage1} className='hero1'/>

          <p className='t1'>Ec<span style={{color: '#0DF316'}}>o</span>Ride</p>
          <p className='t2'>"Go Green, Go Electric, Go Anywhere:</p>
          <p className='t3'>Rent the Future!"</p>
        </div>
        <button className='btnStart'>Let's Ride</button>
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
          <LinkContainer to='/packageshome'>
            <li>
              <NavLink to='/packageshome' activeClassName='active-link' id='link'>
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

      {/* Vehicle Inventory  */}
      <p className='vehicleTitle'>Modern Brands</p>

      <div className='vehiclesBG'>
        <img src={vehicleBG} className="vehiPoster" />
      </div>
      <br />
      <div className='vehicleBrands'>
          <div className='brand'><img src={logo1} className="brandImage" /></div>
          <div className='brand'><img src={logo2} className="brandImage" /></div>
          <div className='brand'><img src={logo3} className="brandImage" /></div>
          <div className='brand'><img src={logo4} className="brandImage" /></div>
          
          <div className='brand'><img src={logo5} className="brandImage" /></div>
          <div className='brand'><img src={logo6} className="brandImage" /></div>
          <div className='brand'><img src={logo7} className="brandImage" /></div>
          <div className='brand'><img src={logo8} className="brandImage" /></div>
      </div>
      <br />

      {/* Vehicle Packages */}
      <p className='packageTitle'>Customized Packages</p>
      <div className='packagesBG'>
        <img src={packBG} className="packPoster" />
      </div>

      <div className='customPacks'>
        <div className='pack1'>
          <p className='packTitle'>Family <br /> Mobility</p>
          <div className='packImage'><img src={pack1} className='packImage'/></div>
        </div>
        <div className='pack2'>
          <p className='packTitle'>Eco <br /> Commute</p>
          <div className='packImage'><img src={pack2} className='packImage'/></div>
        </div>
        <div className='pack3'>
          <p className='packTitle'>Adventure <br /> Seeker</p>
          <div className='packImage'><img src={pack3} className='packImage'/></div>
        </div>
      </div>

      {/* Reservation */}
      <p className='reservationTitle'>Fast Reservations</p>
      <div className='reservationBG'>
        <img src={reservation} className="reservePoster" />
      </div>

      <div className='tranfer'>
          <div className='trans'><img src={trans1} className="transImage" /></div>
          <div className='trans'><img src={trans2} className="transImage" /></div>
          <div className='trans'><img src={trans3} className="transImage" /></div>
          <div className='trans'><img src={trans4} className="transImage" /></div>
      </div>

      {/* Maintenance */}
      <p className='maintainTitle'>Daily Maintenance</p>
      <div className='maintainBG'>
        <img src={maintain} className="maintainPoster" />
      </div>

      <div className='maintains1'><img src={maint1} className="ma" /></div>
      <div className='maintains2'><img src={maint2} className="ma" /></div>

      <br />
      <br />

      {/* Damage and Incident */}
      <p className='damageTitle'>Incident Handler</p>
      <div className='damageBG'>
        <img src={damage} className="damagePoster" />
      </div>

      <div className='damage'>
          <div className='dam'><img src={dam1} className="damageImage" /></div>
          <div className='dam'><img src={dam2} className="damageImage" /></div>
          <div className='dam'><img src={dam3} className="damageImage" /></div>
      </div>

      {/* Feedback and Customer Loyalty */}

      <p className='loyaltyTitle'>Customer Loyalty</p>
      <div className='loyaltyBG'>
        <img src={loyalty} className="loyaltyPoster" />
      </div>

      <div className='feedback'>
          <div className='feed'><img src={feed1} className="feedImage" /></div>
          <div className='feed'><img src={feed2} className="feedImage" /></div>
          <div className='feed'><img src={feed3} className="feedImage" /></div>
      </div>

      <br />  

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
  );
};

export default Hero;
