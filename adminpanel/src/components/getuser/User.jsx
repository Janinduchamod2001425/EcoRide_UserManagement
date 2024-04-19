import React, { useEffect, useState } from 'react';
import "./user.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';

const User = () => {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // ----------------------------------------------------------------

  // Get user data from the mongodb database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  // ----------------------------------------------------------------

  // Delete user function
  const deleteUser = async (userId) => {
    try {

      const confirmDeletion = window.confirm('Are you sure you want to remove this user');
      if (!confirmDeletion) return;

      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-center", className: "alert" });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // ----------------------------------------------------------------

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(query);
      const emailMatch = user.email.toLowerCase().includes(query);
      const contactMatch = user.contact.toLowerCase().includes(query);
      const roleMatch = user.role.toLowerCase().includes(query);

      // Check for date/time match
      const registrationDateTime = new Date(user.createdAt).toLocaleString().toLowerCase();
      const dateTimeMatch = registrationDateTime.includes(query);

      // Return true if any of the fields match the query
      return nameMatch || emailMatch || contactMatch || roleMatch || dateTimeMatch;
    });

    // Update filteredUsers state with the filtered results
    setFilteredUsers(filtered);
  };

  // ------------------------- Calculations ---------------------------------------

  // Calculate total number of users
  const totalUsers = users.length;

  // Calculate user statistics
  const userRoles = {};
  users.forEach(user => {
    userRoles[user.role] = (userRoles[user.role] || 0) + 1;
  });

  // ---------------------------- Report Generation ------------------------------------

  // CSV data for export
  const csvData = [
    ["Total Users", totalUsers], // Add total number of users
    ...Object.keys(userRoles).map(role => [role, userRoles[role]]), // Add user counts by role
    [], // Empty row for better readability
    ["Name", "Email", "Contact", "Role", "Registration Date/Time"],
    ...filteredUsers.map((user) => [user.name, user.email, user.contact, user.role, new Date(user.createdAt).toLocaleString()])
  ];

  // Download pdf of the user report
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User report", 10, 10);

    // add user data to pdf
    filteredUsers.forEach((user, index) => {
      const y = 20 + index * 10;
      doc.text(`Name : ${user.name}, Email : ${user.email}, Contact : ${user.contact}, Role : ${user.role}, Registration Date : ${new Date(user.createdAt).toLocaleString()}`, 10, y);
    });

    // save the pdf
    doc.save("UserReport.pdf");
  }

  // ----------------------------------------------------------------

  // Dashboard interface
  return (
    <div className='userTable'>
      <h2 className='headingTitle'>User Management Dashboard</h2>
      <br />
      <div className='total'>All Users <br /> <span style={{ fontSize: '80px', fontFamily: 'monospace', marginTop: '20px' }}>{totalUsers}</span> </div>
      <ul className='rolesBoxes'>
        {Object.keys(userRoles).map(role => (
          <li className='subRole' key={role}>{role} <br /> <span style={{ fontSize: '80px', fontFamily: 'monospace', marginTop: '20px', color: 'white' }}>{userRoles[role]}</span> </li>
        ))}
      </ul>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className='search-bar'>
        <input className='searchBox'
          type='text'
          placeholder='🔎 Search users'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Link to='http://localhost:4000/usersReport' className='homeButton'>Back To Main Site</Link>
      <Link to='/home' className='homeButton'>Back To Home</Link>
      <Link to={"/add"} className='addButton'>Add New User</Link>

      <CSVLink data={csvData} filename={"EcoRide_userReport.csv"} className='downloadButton'>Download Report</CSVLink>
      {/* <button onClick={downloadPDF}>Download PDF Report</button> */}

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>User No</th>
            <th>name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Role</th>
            <th>Reg. Date/Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className='actionButtons'>
                    <button onClick={() => deleteUser(user._id)}>Delete <i className="fa-solid fa-trash"></i></button>
                    <Link to={`/edit/` + user._id}>Edit <i className="fa-solid fa-pen-to-square"></i></Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <br />
    </div>
  )
}

export default User;
