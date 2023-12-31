import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TransactionPage = () => {
  const [fromAccountOptions, setFromAccountOptions] = useState([]);
  const [from_account, setFromAccountId] = useState('');
  const [to_account, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [tType, setTransactionType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    fetchFromAccountData();
  }, []);

  const fetchFromAccountData = async () => {
    try {
      var customer_id = sessionStorage.getItem("userId");
      const response = await axios.get('http://localhost:8080/account/readCustomer/'+customer_id); // Replace with actual endpoint
      setFromAccountOptions(response.data);
    } catch (error) {
      console.error('Error fetching from account data:', error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    let backendTransactionType;
  if (tType === 'neft') {
    backendTransactionType = 0;
  } else if (tType === 'rtgs') {
    backendTransactionType = 1;
  } else if (tType === 'imps') {
    backendTransactionType = 2;
  }
    try {
      // Construct the transaction data object
      const transactionData = {
        from_account,
        to_account,
        amount,
        tType : backendTransactionType,
      };

      // Make a POST request to the backend API for transaction submission
      if(amount>50000)
      {
        toast("Amount is more than 50000. Please add as beneficiary to transfer");
      }
      else
      {
      const response = await axios.post('http://localhost:8080/customer/transaction', transactionData).catch(function (error) {
        if (error.response) {
          toast(error.response.data.message);
        }
      });; // Replace with actual endpoint

      // Handle the response from the backend (e.g., show success message)
      if(response)
      {
        toast("Transaction Successful");
      }
      else
      {
        toast("Transaction failed");
      }
      console.log('Transaction submitted:', response.data);
    }
    
    } catch (error) {
      console.error('Error submitting transaction:', error);
      // Handle the error (e.g., show error message)
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <h1>Transaction Page</h1>
      <form onSubmit={handleSubmit}>
        {/* From Account */}
        <div className="form-container">
        <div className="form-field">
          <label htmlFor="fromAccount">From Account:</label>
          <select id="fromAccount" value={from_account} onChange={e => setFromAccountId(e.target.value)}>
            <option value="">Select an account</option>
            {fromAccountOptions.map(account => (
              <option key={account.id} value={account.id}>
                {account.account_id}
              </option>
            ))}
          </select>
        </div>

        {/* To Account */}
        <div className="form-field">
          <label htmlFor="toAccount">To Account:</label>
          <input type="text" id="toAccount" value={to_account} onChange={e => setToAccountId(e.target.value)} />
        </div>

        {/* Amount */}
        <div className="form-field">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>

        {/* Transaction Type */}
        <div className="form-field">
          <label htmlFor="transactionType">Transaction Type:</label>
          <select id="transactionType" value={tType} onChange={e => setTransactionType(e.target.value)}>
            <option value="">Select a transaction type</option>
            <option value="imps">IMPS</option>
            <option value="neft">NEFT</option>
            <option value="rtgs">RTGS</option>
          </select>
        </div>

        {/*  className="form-field"Remarks */}
        <div className="form-field">
          <label htmlFor="remarks">Remarks:</label>
          <textarea id="remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
        </div>

        {/* Instructions */}
        <div className="form-field"> 
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
        </div>

        {/* Submit button */}
        <button className="form-button" type="submit">Submit Transaction</button>
        </div>
      </form>
    </div>
    
  );
};

export default TransactionPage;
