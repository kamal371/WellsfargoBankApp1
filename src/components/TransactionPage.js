import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios using `npm install axios`

const TransactionPage = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [transactionDate, setTransactionDate] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [remark, setRemark] = useState("");
  const [typeOfTransaction, setTypeOfTransaction] = useState("");


  useEffect(() => {
    // Fetch account options from the backend when the component mounts
    fetchAccountOptions();
  }, []);

  const fetchAccountOptions = async () => {
    try {
      const response = await axios.get("/api/accounts"); // Replace with your endpoint
      setAccountOptions(response.data); // Assuming the response contains account data
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      fromAccountId,
      toAccountId,
      amount,
      transactionDate,
      Instructions,
      remark,
      typeOfTransaction,
    };

    try {
      const response = await axios.post("/api/transactions/transfer", transactionData);
      console.log(response.data); // Display response from the backend
      // Reset the form after successful transfer
      setFromAccountId("");
      setToAccountId("");
      setAmount("");
      setAccountOptions("");
      setTransactionDate("");
      setInstructions("");
      setRemark("");
      setTypeOfTransaction("");
      // ... reset other state variables
    } catch (error) {
      console.error("Error transferring money:", error);
    }
  };

  // ... JSX and form components

  return (
    <div className="transaction-page">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>From Account ID</label>
        <select
          className="form-control"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
        >
          <option value="">Select an account</option>
          {accountOptions.map((account) => (
            <option key={account.id} value={account.id}>
              {account.accountName} - {account.accountNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
          <label>To Account ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter to account ID"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Transaction Date</label>
          <input
            type="date"
            className="form-control"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Instructions</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter instructions"
            value={Instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Remark</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Type of Transaction</label>
          <select
            className="form-control"
            value={typeOfTransaction}
            onChange={(e) => setTypeOfTransaction(e.target.value)}
          >
            <option value="RTGS">RTGS</option>
            <option value="IMPS">IMPS</option>
            <option value="NEFT">NEFT</option>
          </select>
        </div>
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransactionPage;
