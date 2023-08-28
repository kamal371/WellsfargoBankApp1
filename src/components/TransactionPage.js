import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:8080/customer/transaction', transactionData); // Replace with actual endpoint

      // Handle the response from the backend (e.g., show success message)
      console.log('Transaction submitted:', response.data);
    } catch (error) {
      console.error('Error submitting transaction:', error);
      // Handle the error (e.g., show error message)
    }
  };

  return (
    <div>
      <h1>Transaction Page</h1>
      <form onSubmit={handleSubmit}>
        {/* From Account */}
        <div>
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
        <div>
          <label htmlFor="toAccount">To Account:</label>
          <input type="text" id="toAccount" value={to_account} onChange={e => setToAccountId(e.target.value)} />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>

        {/* Transaction Type */}
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select id="transactionType" value={tType} onChange={e => setTransactionType(e.target.value)}>
            <option value="">Select a transaction type</option>
            <option value="imps">IMPS</option>
            <option value="neft">NEFT</option>
            <option value="rtgs">RTGS</option>
          </select>
        </div>

        {/* Remarks */}
        <div>
          <label htmlFor="remarks">Remarks:</label>
          <textarea id="remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
        </div>

        {/* Submit button */}
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default TransactionPage;
