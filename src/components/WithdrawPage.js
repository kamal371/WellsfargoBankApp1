import React, { useState,useEffect } from 'react';
import axios from "axios";

var resp_account_balance;

const WithdrawPage = () => {


  useEffect(() => {
    loadUsers();
   // fetchAccountOptions();
  }, []);

  const loadUsers = async () => {
   // resp_account_balance=window.sessionStorage.getItem("resp_account_balance");

  //  var userId=window.sessionStorage.getItem("userId");
  //  console.log("user id is: "+userId);
  //  const response = await axios.get("http://localhost:8080/account/readCustomer/"+userId);
  //  console.log("withdrawal response.data :",response.data);

  resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
    console.log("account balance in withdrawl :",resp_account_balance);
  };

  const [balance, setBalance] = useState(200); // Initial balance
  const [withdrawAmount, setWithdrawAmount] = useState(0); // Withdrawal amount state
  console.log("balance :",balance);
  const handleWithdraw = () => {
   // acc_balance = sessionStorage.getItem
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prevBalance => prevBalance - withdrawAmount);
      setWithdrawAmount(0); // Reset withdrawal amount after successful withdrawal
    } else {
      alert('Invalid withdrawal amount or insufficient balance.');
    }
  };

  return (
    <div>
      <h2>Withdraw </h2>
      <p>Account Balance: {balance}</p>
      <input
        type="number"
        placeholder="Enter withdrawal amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default WithdrawPage;
