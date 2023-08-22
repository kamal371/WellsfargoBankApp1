import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccount.css';


function CreateAccount({ userName }) {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('savings'); // Default account type
  const [balance, setBalance] = useState(0); // Default balance

  const generateUniqueId = () => {
    // Generate a random ID here (you can use libraries like UUID)
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountId = generateUniqueId();

    // Prepare account data
    const accountData = {
      id: accountId,
      username: userName, // Assuming you have user's ID from login
      accountName,
      accountType,
      balance,
    };

    try {
      // Send account data to the backend
      const response = await axios.post('http://localhost:8000/accounts', accountData);

      if (response.status === 201) {
        console.log('Account created successfully');
        // Optionally, you can show a success message to the user
      }
    } catch (error) {
      console.error('Error creating account:', error);
      // Handle error and show error message to the user
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Account Name</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Account Type</label>
          <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            {/* Add more account types if needed */}
          </select>
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
