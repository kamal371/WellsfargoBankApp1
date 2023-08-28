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
import Navbar from "./Navbar";
//import TransferMoney from './TransferMoney';
//var dat = window.sessionStorage.getItem("userCredentials");

// var userName = window.sessionStorage.getItem("userName"); kamal-latest-change
// var token = window.sessionStorage.getItem("token"); kamal-laetst-change

//  var data = JSON.parse(dat);
var customerID=null,customer_name=null,email=null,contact=null,index;
// var customerID= "Dummy"//data["customer_id"];
// var customer_name="Dummy"//data["customer_name"];
// var email="Dummy"//data["email"];
// var contact="Dummy"//data["contact"];

// Define the Dashboard component
const Dashboard = () => {
 // var customerID;
 // account details and balance

  //const [amount, setAmount] = useState("");
  //const [accountOptions, setAccountOptions] = useState([]);
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
  console.log(result.data);
  //window.sessionStorage.setItem("customer_name",customer_name);//kamal-change
  
    //setUsers(result.data);
  };


  const [selectedAccount, setSelectedAccount] = useState(''); // Selected account state

  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
 
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [displayedValue, setDisplayedValue] = useState('');
  
   useEffect(() => {
     fetchAccountOptions();
   }, [userdetails]);
   const handleClick = async() => {
    // Update state to indicate button was clicked and set the value to display
    setIsButtonClicked(true);
    var dotat = 0;
    for(let i=0;i<selectedAccount.length;i++){
        if(selectedAccount.charAt(i) == '.'){
            dotat = i;
        }
    }
    index = parseInt(selectedAccount.slice(0,dotat));
    console.log(index);
    if(isNaN(index)){
        setDisplayedValue("Please select an account");
    } else {
      //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
      window.sessionStorage.setItem("account_id",accountOptions[index].account_id);
      
      var stored_account_id=window.sessionStorage.getItem("account_id");
      console.log("stored acct id from window ",stored_account_id);
      const resulta = await  axios.get("http://localhost:8080/account/read/"+stored_account_id)
      console.log("resulta response ",resulta.data);
        setDisplayedValue("Current Balance is: Rs."+resulta.data.balance);

    }

    var account_id_sent=window.sessionStorage.getItem("account_id");
    console.log("account ID in AccountSelection.js :",account_id_sent);

    var resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
    console.log("account balance in AccountSelection.js :",resp_account_balance);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    console.log("event :",event);
    console.log("event.target :",event.target);
    console.log("event.target.value :",event.target.value);
    window.sessionStorage.setItem("accountDetails",event.target.value);

    // window.sessionStorage.setItem("account_id_for_account_summary",accountOptions[index].account_id);
      
    // var account_id_for_account_summary=window.sessionStorage.getItem("account_id_for_account_summary");
    // console.log("stored acct id from window for account summary",account_id_for_account_summary);

    console.log("event.target.value :",event.target.value);
    console.log("type of event.target.value :",Object.prototype.toString.call(event.target.value));
    //window.sessionStorage.setItem("customer_account_id",accountOptions[index].account_id);
    //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
    //console.log("account_id :",window.sessionStorage.getItem("customer_balance"));
  };

    // useEffect=async()=>{
    //   fetchAccountOptions();
    // };

  const fetchAccountOptions = async () => {
    try {
      var userId=window.sessionStorage.getItem("userId");
      console.log("user id in acc selec is: "+userdetails+userdetails[0].customer_id);
      const response = await axios.get("http://localhost:8080/account/readCustomer/"+userdetails[0].customer_id); // Replace with your endpoint
      console.log("Kamal's acciynts")
      console.log("response :",response);
      console.log("response.data in accountselection.js :",response.data);
      var accounts = response.data
      console.log(accounts.length)
      var accountids =  [];
      for(let i=0;i<accounts.length;i++){
        //console.log(response.data[i]);
        if(response.data[i].activity===1){
          accountids[i] = response.data[i];
        }
        
      }
      console.log(accountids);
      setAccountOptions(accountids); // Assuming the response contains account data
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
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
      {/* <h2>Select an Account</h2>
      <label htmlFor="accountSelect">Choose an account:</label> */}
      {/* <select id="accountSelect" value={selectedAccount} onChange={handleAccountChange}> */}
      <div className="form-group">
        <label>Select an Account</label>
        <select
          className="form-control"
          value={selectedAccount}
          onChange={handleAccountChange}
        >
          <option value="">Select an account</option>

          {accountOptions.map((account,index) => (
            <option key={account.id} value={account.id}>
              {index}. {account.account_id} - {account.accountType} 
             
            </option>
            
          ))}
        </select>
      </div>
      {/* {selectedAccount && <p>Selected account: {selectedAccount}</p>} */}
      <div className="check_balance">
          {/* <CheckBalance/> */}
            <button onClick={handleClick}>Check Balance</button>
              {isButtonClicked && <p>{displayedValue}</p>}
            </div>
      </div>
        </main>
        
      </div>
    
  );


};

export default Dashboard;
