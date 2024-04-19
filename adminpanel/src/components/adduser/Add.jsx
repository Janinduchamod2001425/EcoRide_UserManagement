import React, { useState } from 'react'
import "./add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Add = () => {

    const navigate = useNavigate();

    const users = {
        name: "",
        email: "",
        contact: "",
        password: "",
        role: "",
    }

    const [user, setUser] = useState(users);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create", user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/");
            }).catch(error => console.log(error));
    }

    return (
        <div className='addUser'>
            <Link to={"/"} className='backHome'>Back to Home</Link>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={inputHandler} name="name" id="name" placeholder='Enter user name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} name="email" id="email" placeholder='Enter user Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="contact">Contact</label>
                    <input type="number" onChange={inputHandler} name="contact" id="contact" placeholder='Enter user contact' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} name="password" id="password" placeholder='password' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="role">Role</label>
                    <select className='inputGroup' name="role" id="role" value={user.role} onChange={inputHandler}>
                        <option value="">Select Role</option>
                        <option value="Customer">Customer</option>
                        <option value="Vehicle Owner">Vehicle Owner</option>
                        <option value="Driver">Driver</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </div>
    )
}

export default Add;
