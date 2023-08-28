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
import SideNavbar from './SideNavbar';
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
var customerID=null,customer_name=null,email=null,contact=null;
// var customerID= "Dummy"//data["customer_id"];
// var customer_name="Dummy"//data["customer_name"];
// var email="Dummy"//data["email"];
// var contact="Dummy"//data["contact"];

// Define the Dashboard component
const Dashboard = () => {
 // var customerID;
 // account details and balance

  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [userdetails, setUserDetails] = useState([{"customer_id":null,"customer_name":null,"email":null,"contact":null}]);


  const [user, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
   // fetchAccountOptions();
  }, []);
  const loadUsers = async () => {
  var token = window.sessionStorage.getItem("token");
  console.log("the token: "+token);
  const config = {headers: {Authorization: "Bearer" + token}};
  var userName = window.sessionStorage.getItem("userName",config);
  console.log("Username in dashboard is: "+userName)
  
  const result = await axios.get("http://localhost:8080/customer/bymail/"+userName,config);

  console.log(result.data);
  setUserDetails([result.data]);
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

        <SideNavbar />
        <main className="content">
          <div className="account-summary">
            <h1>User Details</h1>
            <table className='User-details-table'>
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
                  {userdetails.map((userdetails) => (
                    <tr>
                      <td>{userdetails.customer_id}</td>
                      <td>{userdetails.customer_name}</td>
                      <td>{userdetails.email}</td>
                      <td>{userdetails.contact}</td>
                    </tr>
                  ))}
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
