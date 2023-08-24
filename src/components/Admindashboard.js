import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Admindashboard.css';
import './TableWithButtons.css';

function AdminDashboard() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/admin/admin");
    setUsers(result.data);
  };
  const handleEditClick = (index) => {
    console.log(`Edit clicked for row ${index}`);
    // Implement your edit logic here
    
  };

  const handleViewClick = (index) => {
    console.log(`View clicked for row ${index}`);
    // Implement your delete logic here
  };
  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {user.map((user,index) => (
            <tr key={index}>
              <td>{user.customer_id}</td>
              <td>{user.customer_name}</td>
              {/* <td>{user.password}</td> */}
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>
                <div className="button-container">
                  <button onClick={() => handleViewClick(index)}>View</button>
                  <button onClick={() => handleEditClick(index)}>Edit</button>
                </div>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
