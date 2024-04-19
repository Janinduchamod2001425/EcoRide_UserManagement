import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./home.css";

import users from '../images/dashboard/customers.png';
import vehicles from '../images/dashboard/vehicles.png';
import packages from '../images/dashboard/Package 1.png';
import payments from '../images/dashboard/payments.png';
import maintains from '../images/dashboard/allmaintenance.png';
import damages from '../images/dashboard/damages.png';
import feedbacks from '../images/dashboard/feedbacks.png';
import loyalty from '../images/dashboard/cusloyalty.png';

const Home = () => {
    return (
        <div>
            <br />
            <Link to='http://localhost:4000/usersReport' id='homeButton'>Back To Main Site</Link>
            <div className='home'>
                <br />
                <h1 className='headingTitle'>EcoRide Admin Dashboard</h1>
                <br />
                <div className='components'>
                    <Link to='/'><div className='compoBox'>
                        <img src={users} className="admImage" />
                    </div></Link>
                    <div className='compoBox'>
                        <img src={vehicles} className="admImage" />
                    </div>
                    <div className='compoBox'>
                        <img src={packages} className="admImage" />
                    </div>
                    <div className='compoBox'>
                        <img src={payments} className="admImage" />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <p className='nameTag1'>Users</p>
                    <p className='nameTag2'>Vehicles</p>
                    <p className='nameTag3'>Packages</p>
                    <p className='nameTag4'>Reservations</p>

                    <br />
                    <br />

                    <div className='compoBox'>
                        <img src={maintains} className="admImage" />
                    </div>
                    <div className='compoBox'>
                        <img src={damages} className="admImage" />
                    </div>
                    <div className='compoBox'>
                        <img src={feedbacks} className="admImage" />
                    </div>
                    <div className='compoBox'>
                        <img src={loyalty} className="admImage" />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <p className='nameTag5'>Maintenance</p>
                    <p className='nameTag6'>Damages</p>
                    <p className='nameTag7'>Feedbacks</p>
                    <p className='nameTag8'>Loyalty</p>
                </div>
            </div>

            
        </div>
    )
}

export default Home;