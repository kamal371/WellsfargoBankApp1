import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import "./TransactionPage.css";



const TransactionPage = () => {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [remark, setRemark] = useState("");
  const [typeOfTransaction, setTypeOfTransaction] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      fromAccountId,
      toAccountId,
      amount,
      transactionDate,
      Instructions,
      remark,
      typeOfTransaction,
    });
  };

  return (
    <div className="transaction-page">
      <h1>Internet Banking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>From Account ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter from account ID"
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
          />
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
