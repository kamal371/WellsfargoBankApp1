import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccount.css';
import Navbar from "./Navbar";
import SideNavbar from './SideNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var username;
var activity,account_id,customer_id;

function CreateAccount({ username }) {
  const [transactionPassword, settransactionPassword] = useState('');
  const [accountType, setAccountType] = useState(''); // Default account type
  const [balance, setBalance] = useState(0); // Default balance
  const [passwordError, setPasswordError] = useState('');
  
  const generateUniqueId = () => {
    // Generate a random ID here (you can use libraries like UUID)
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const validatePassword = () => {
    if (transactionPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
    console.log("validatepassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePassword();
    
    const accountId = generateUniqueId();
    username = window.sessionStorage.getItem("userName");
    console.log("userName :",username);
    const result = await axios.get("http://localhost:8080/customer/bymail/"+username );
    customer_id = result.data.customer_id;
    account_id=1;//default value at frontend
    activity=1;//default value at frontend
    
    // Prepare account data
    const accountData = {
      //id: accountId,
      // username: userName, // Assuming you have user's ID from login
      // //accountName,
      // accountType,
      balance,
      username,
      transactionPassword,
      activity,
      accountType,
      account_id,
      customer_id

    };

    if ( passwordError === ''){
    try {
      // Send account data to the backend
      console.log("accountData with stringify :",JSON.stringify(accountData));
      console.log("accountData without stringify :",accountData);
      //console.log(JSON.stringify(accountData));
      const response = await axios.post('http://localhost:8080/account/add', accountData).catch(function (error) {
        if (error.response) {
          toast(error.response.data.message);
        }
      });
      console.log("response.data in createaccount.js :",response.data);
      if (response.data) {
        console.log('Account created successfully');
        toast("Account created successfully");
        // Optionally, you can show a success message to the user
      }
      else{
        console.log('Account not created');
        toast("Failed to create account");
      }
    } catch (error) {
      console.error('Error creating account:', error);
      
      // Handle error and show error message to the user
    }
  }
  };

  return (
    <div className="create-account-container">
      <SideNavbar/>
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <label>Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="0">Savings</option>
            <option value="1">Current</option>
            {/* Add more account types if needed */}
          </select>
        </div>
        <div className="input-group">
          <label>Transaction Password</label>
          <input
            type="password"
            value={transactionPassword}
            onChange={(e) => settransactionPassword(e.target.value)}
            onBlur={validatePassword}
            required
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>
        <div className="input-group">
          <label>Initial Balance</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
