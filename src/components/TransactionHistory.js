import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [accountOptions, setAccountOptions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchAccountOptions();
  }, []);

  useEffect(() => {
    if (selectedAccountId !== '') {
      fetchTransactions();
    }
  }, [selectedAccountId]);

  const fetchAccountOptions = async () => {
    try {
      const response = await axios.get("/api/accounts"); // Replace with your endpoint
      setAccountOptions(response.data); // Assuming the response contains account data
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions/${selectedAccountId}`); // Replace with your endpoint
      setTransactions(response.data); // Assuming the response contains transaction data
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAccountSelect = (accountId) => {
    setSelectedAccountId(accountId);
  };

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <div className="account-dropdown">
        <label>Select Account:</label>
        <select
          value={selectedAccountId}
          onChange={(e) => handleAccountSelect(e.target.value)}
        >
          <option value="">Select an account</option>
          {accountOptions.map(account => (
            <option key={account.id} value={account.id}>
              {account.accountNumber} - {account.accountName}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr
              key={transaction.id}
              className={transaction.amount.startsWith('-') ? 'debit' : 'credit'}
            >
              <td>{transaction.date}</td>
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
