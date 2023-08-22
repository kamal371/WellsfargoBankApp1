// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountSummary.css'

// Define the AccountSummary component
const AccountSummary = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountStatus, setAccountStatus] = useState("");

  // useEffect(() => {
  //   // Fetch account data from JSON server
  //   axios.get('http://localhost:3000/accounts')
  //     .then(response => {
  //       //setAccounts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching account data:', error);
  //     });
  // }, []);

  return (
    <div className="account-summary">
    <h1>Account Summary</h1>
    <table>
      <tr>
        <th>Account Number</th>
        <td>{accountNumber}</td>
      </tr>
      <tr>
        <th>Account Balance</th>
        <td>{accountBalance}</td>
      </tr>
      <tr>
        <th>Account Type</th>
        <td>{accountType}</td>
      </tr>
      <tr>
        <th>Account Status</th>
        <td>{accountStatus}</td>
      </tr>
    </table>
  </div>
);
};

export default AccountSummary;
