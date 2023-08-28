import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Admindashboard.css';
import './TableWithButtons.css';
import AdminView from './Adminview.js';
import { useNavigate } from 'react-router-dom';
import TableWithSearch from './TableWithSearch';

var index;
var tableData;

function AdminDashboard() {
  const [user, setUsers] = useState([]);

  const navigate = useNavigate(); // Access the navigate function

  useEffect(() => {
    loadUsers();
    //handleViewClick();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/admin/admin");
    console.log("admin dashboard result.data ",result.data);
    // window.sessionStorage.setItem("admin_data",result.data);
    // console.log("tableDta in loadUsers in admindashboard.js :",window.sessionStorage.getItem("admin_data"))
    setUsers(result.data);
  };
  
  const handleDeleteClick = async(index) => {
    console.log(`Edit clicked for row ${index}`);
    // Implement your edit logic here
    const customer_data={
      customer_id:user[index].customer_id
    };
    console.log("user.customer_id in admindashboard.js :",user[index].customer_id);
    const update_customer_status = await axios.put("http://localhost:8080/admin/ActivateCustomer",customer_data);
    console.log("update_customer_status in admindashboard.js :",update_customer_status);
  };

  const handleViewClick = async (index) => {
    console.log(`View clicked for row ${index}`);
    //window.sessionStorage.setItem("admin_customer_id ",user[index].customer_id);
    window.sessionStorage.setItem("admin_customer_id",user[index].customer_id);
    console.log("iN Adminview.js user[index].customer_id ",user[index].customer_id);
    // Implement your delete logic here
    navigate('/admin-view');
  };

// search bar implementatio
   tableData=user;
   console.log("tableDta in admindashboard.js :",{tableData});
  //  tableData=[{
  //       "password": "PriPass",
  //       "email": "unocusto@mail.com",
  //       "contact": 12345,
  //       "loginAttempt": 0,
  //       "activeStatus": true,
  //       "lastLogin": null,
  //       "customer_name": "UnoCusto",
  //       "customer_id": 1
  //   }];

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div>
      
        <TableWithSearch tableData={tableData} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer Id</th>
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
                  <button onClick={() => handleViewClick(index)}>View/Edit</button>
                  <button onClick={() => handleDeleteClick(index)}>Change customer status</button>
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
