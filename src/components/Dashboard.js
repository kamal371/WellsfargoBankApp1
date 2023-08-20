// Import necessary dependencies
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import AccountSummary from './AccountSummary';
import TransactionPage from './TransactionPage';
import TransactionHistory from './TransactionHistory';
import Login from './Login';
import './TransactionPage.css';
import './CreateAccount.css';
import './AccountSummary.css';
import './dashboard_navbar.css';
import './TransactionHistory.css';
import './sidebar.css';
import './Login.css';
import dashboard_navbar from './dashboard_navbar';
//import TransferMoney from './TransferMoney';

// Define the Dashboard component
const Dashboard = () => {

  const [user, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/admin/admin");
    // console.log(result);
    setUsers(result.data);
  };

  return (
    
      <div className='app'>

        <nav>
          <div className="sidebar">
            {/* <div className="logo">My Sidebar</div> */}
            <ul className="sidebar-menu">
              <li>
              <Link to="/login">Home</Link>
              </li>
              <li>
              <Link to="/account-summary">Account Summary</Link>
              </li>
              <li>
              <Link to="/transaction-page">Internet Banking</Link>
              </li>
              <li>
              <Link to="/transaction-history">Transaction History</Link>
              </li>
              <li>
                Check Balance
              </li>
            </ul>
          </div>
        </nav>
        <main className="content">
          <div className="account-summary">
            <h1>User Details</h1>
            <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                {/* <th>Password</th> */}
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>

              {user.map(user => (
                <tr key={user.customer_id}>
                  <td>{user.customer_id}</td>
                  <td>{user.customer_name}</td>
                  {/* <td>{user.password}</td> */}
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
          </div>
        </main>

      </div>
    
  );
};

export default Dashboard;
