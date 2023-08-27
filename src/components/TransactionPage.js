import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios using `npm install axios`

const TransactionPage = () => {
  const [from_account, setFromAccountId] = useState("");
  const [to_account, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [transactionPassword, setTransactionPassword] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [remark, setRemark] = useState("");
  const [tType, setTypeOfTransaction] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailure, setTransactionFailure] = useState(false);
  const transactionTypeMap = {
    IMPS: 2,
    RTGS: 1,
    NEFT: 0,
  };

  useEffect(() => {
    // Fetch account options from the backend when the component mounts
    fetchAccountOptions();
  }, []);

  const fetchAccountOptions = async () => {
    try {
      var userId=window.sessionStorage.getItem("userId");
      const response = await axios.get("http://localhost:8080/account/readCustomer/"+userId); // Replace with your endpoint
      console.log("Kamal's acciynts")
      console.log(response);
      var accounts = response.data
      console.log(accounts.length)
      var accountids =  [];
      for(let i=0;i<accounts.length;i++){
       // console.log(response.data[i]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      from_account,
      to_account,
      amount,
      tType:transactionTypeMap[tType],
      
    };

    
    
    try {
      console.log(transactionData);
      const response = await axios.post("http://localhost:8080/customer/transaction", transactionData);
      
      if (response.status === 200) {
        console.log("Transaction successful:", response.data);
        // Reset the form after successful transfer
        setFromAccountId("");
        setToAccountId("");
        setAmount("");
        setAccountOptions([]);
        setTypeOfTransaction("");
        setInstructions("");
        setRemark("");
        setTransactionPassword(""); // Clear the transaction password field
        setTransactionSuccess(true);
        setTransactionFailure(false); 
              // ... reset other state variables
      } else {
        console.log("Transaction failed:", response.data); // Assuming response contains error information
        // You can handle the failed transaction case here
        setTransactionSuccess(false); // Reset the success state
        setTransactionFailure(true);
      }
    } catch (error) {
      console.error("Error transferring money:", error);
      // Handle the error case here
      setTransactionSuccess(false); // Reset the success state
        setTransactionFailure(true);
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
          value={from_account}
          onChange={(e) => setFromAccountId(e.target.value)}
        >
          <option value="">Select an account</option>
          {accountOptions.map((account) => (
            <option key={account.id} value={account.id}>
              {account.account_id}
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
            value={to_account}
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
        {/* <div className="form-group">
   <label>Transaction Password</label>
    <input
    type="password"
    className="form-control"
    placeholder="Enter transaction password"
    value={transactionPassword}
    onChange={(e) => setTransactionPassword(e.target.value)}
    />
    </div> */}

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
            value={tType}
            onChange={(e) => setTypeOfTransaction(e.target.value)}
          >
            <option value="RTGS">RTGS</option>
            <option value="IMPS">IMPS</option>
            <option value="NEFT">NEFT</option>
          </select>
        </div>
      <button type="submit">Submit</button>
      </form>
      {transactionSuccess && (
        <div className="success-message">Transaction was successful!</div>
      )}
      {transactionFailure && (
        <div className="error-message">Transaction has failed.</div>
      )}
    </div>
  );
};

export default TransactionPage;
