// Import necessary dependencies
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount';
import AccountSummary from './AccountSummary';
import TransactionPage from './TransactionBeneficiaryPage';
import TransactionHistory from './TransactionHistory';
import CheckBalance from './check_balance';
import WithdrawPage from './WithdrawPage';
import AccountSelection from './AccountSelection';
//import CreateAccount from './CreateAccount';
import Login from './Login';
import './TransactionBeneficiaryPage.css';
import './CreateAccount.css';
import './AccountSummary.css';
import './dashboard_navbar.css';
import './TransactionHistory.css';
import './sidebar.css';
import './Login.css';
//import './CreateAccount.css';
import dashboard_navbar from './dashboard_navbar';
//import TransferMoney from './TransferMoney';
//var dat = window.sessionStorage.getItem("userCredentials");

// var userName = window.sessionStorage.getItem("userName"); kamal-latest-change
// var token = window.sessionStorage.getItem("token"); kamal-laetst-change

//  var data = JSON.parse(dat);
var customerID,customer_name,email,contact;
// var customerID= "Dummy"//data["customer_id"];
// var customer_name="Dummy"//data["customer_name"];
// var email="Dummy"//data["email"];
// var contact="Dummy"//data["contact"];
console.log("Below is customer ID");
console.log(customerID);
// Define the Dashboard component
const Dashboard = () => {
 // var customerID;
 // account details and balance

 const [amount, setAmount] = useState(null);
 const [accountOptions, setAccountOptions] = useState([]);



  const [user, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
   // fetchAccountOptions();
  }, []);
  const loadUsers = async () => {
  var token = window.sessionStorage.getItem("token");
  console.log("the token: "+token);
  const config = {headers: {Authorization: token}};
  var userName = window.sessionStorage.getItem("userName");
  console.log("Username is: "+userName)
  
  const result = await axios.get("http://localhost:8080/customer/bymail/"+userName,config );

  console.log("dashboard",result);
  customerID = result.data.customer_id;
  customer_name = result.data.customer_name;
  email = result.data.email;
  contact = result.data.contact;
  window.sessionStorage.setItem("userId",customerID);// kamal-new-change
  //window.sessionStorage.setItem("customer_name",customer_name);//kamal-change
  
    //setUsers(result.data);
  };





  return (
    
      <div className='app'>

        <nav>
          <div className="sidebar">
            {/* <div className="logo">My Sidebar</div> */}
            <ul className="sidebar-menu">
              <li>
              <Link to="/create-account">Create Account</Link>
              </li>
              <li>
              <Link to="/account-summary">Account Summary</Link>
              </li>
              <li>
              <Link to="/transaction-page">Internet Banking</Link>
              </li>
              <li>
              <Link to="/transaction-beneficiary-page">Internet Banking with beneficiary</Link>
              </li>
              <li>
              <Link to="/transaction-history">Transaction History</Link>
              </li>
              <li>
              <WithdrawPage />
              </li>
              <li>
              <Link to="/login">Log Out</Link>
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
                <th>customerID</th>
                <th>Username</th>
                {/* <th>Password</th> */}
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{customerID}</td>
                  <td>{customer_name}</td>
                  {/* <td>{user.password}</td> */}
                  <td>{email}</td>
                  <td>{contact}</td>
                </tr>
            </tbody>
          </table>
          </div>
          <div>
            <AccountSelection />
          </div>
        </main>
        
      </div>
    
  );


};

export default Dashboard;
