import React, { useState,useEffect } from 'react';
import axios from "axios";
import Navbar from "./Navbar";

var resp_account_balance,account_id;
var       transaction_time,from_account,to_account,transaction_id,tType;

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

  // resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
  //   console.log("account balance in withdrawl :",resp_account_balance);
  };
  

  const [balance, setBalance] = useState(); // Initial balance
  const [withdrawAmount, setWithdrawAmount] = useState(0); // Withdrawal amount state
  // resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
  // console.log("balance :",balance);
  
  console.log("accoutn balance in withdwa.js page :");


  const handleWithdraw = async(e) => {
    e.preventDefault();

    account_id=parseInt(window.sessionStorage.getItem("account_id"));
    console.log("accoutn ID in withdwa.js page :",account_id);

    resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
    console.log("accoutn balance in withdwa.js page :",resp_account_balance);
    transaction_time="2023-08-21T00:00:00";
    transaction_id=0;
    tType=3;

    //balance = resp_account_balance;
    // Prepare account data

    const transactionData = {
      //id: accountId,
      // username: userName, // Assuming you have user's ID from login
      // //accountName,
      // accountType,
      transactionId:transaction_id,
      from_account:account_id,
      to_account:account_id,
      transactionTime:transaction_time,
      amount:withdrawAmount,
      transaction_type:tType
    };

    if (withdrawAmount > 0 ) {
      //setBalance(prevBalance => prevBalance - withdrawAmount);
      console.log(transactionData);
      const response = await axios.post('http://localhost:8080/customer/withdrawal', transactionData,             
      {headers: {
        "Content-Type": "application/json"
      }});
      console.log("response.data :",response.data);
      setWithdrawAmount(0); // Reset withdrawal amount after successful withdrawal
      if (response.data) {
        console.log('Withdrawal successfully');
        // Optionally, you can show a success message to the user
      }
      else{
        console.log('withdrawal not done');
      }

    } else {
      alert('Invalid withdrawal amount or insufficient balance.');
    }
  };

  return (
    <div>
      <h2>Withdraw </h2>
      <p>Enter amount to withdraw {balance}</p>
      <input
        type="number"
        placeholder="Enter withdrawal amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
                  {/* <button onClick={handleClick}>Check Balance</button>
         {isButtonClicked && <p>{displayedValue}</p>} */}
    </div>
  );
};

export default WithdrawPage;
