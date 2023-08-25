import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

var selected_acc;

const TransactionHistory = () => {
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [accountOptions, setAccountOptions] = useState([]);
  const [transactions, setTransactions] = useState({
    debits: [],
    credits: [],
    withdrawals: [],
  });


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
      var userId = window.sessionStorage.getItem('userId');
      const response = await axios.get(
        'http://localhost:8080/account/readCustomer/' + userId
      );
      console.log(response.data);
      var accounts = response.data;
      var accountids = accounts.map((account) => account.account_id);
      setAccountOptions(accountids);
    } catch (error) {
      console.error('Error fetching account options:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      var response = await axios.get(
        `http://localhost:8080/customer/transaction/` + selected_acc
      );
      console.log("transactions")
      console.log(response.data);
      setTransactions(response.data); // Assuming the response contains transaction data
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAccountSelect = (accountId) => {
    selected_acc = accountId;
    setSelectedAccountId(accountId);
  };


let count = 1;
console.log(count);
count += 1;
var debits = transactions.debits;
try{
  for(let i=0;i<debits.length;i++){
    debits[i].amount *= -1;
  }
  console.log("Proscuitto: "+debits[0].amount); 
} catch (err){
  console.log(err);
}

 
//debits[0].amount *= -1;

var credits = transactions.credits;
var withdrawals = transactions.withdrawals;
console.log("Prescuitto: "+typeof(withdrawals));
try{
  for(let i=0;i<withdrawals.length();i++){
    withdrawals.amount *= -1;
    withdrawals.tType = "Withdraw"
  }
} catch(err){
  console.log("No withdrawals " + err);
}
//withdrawals.tType *= -1;
//withdrawals[0].tType = "Withdrawn";


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
          {accountOptions.map((accountId) => (
            <option key={accountId} value={accountId}>
              {accountId}
            </option>
          ))}
        </select>
      </div>
      <div className="transaction-tables">
        <div className="transaction-table">
          <h2>Debits</h2>
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Transaction Time</th>
                <th>Payer</th>
                <th>Payee</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {debits.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_time.slice(8,10)+"/"+transaction.transaction_time.slice(5,7)+"/"+transaction.transaction_time.slice(0,4) +" at "+transaction.transaction_time.slice(11,16)}</td>
          <td>{transaction.from_account}</td>
          <td>{transaction.to_account}</td>
          <td>{transaction.tType}</td>
          <td>{transaction.amount*-1}</td>
                </tr>
              ))}
              {credits.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_time.slice(8,10)+"/"+transaction.transaction_time.slice(5,7)+"/"+transaction.transaction_time.slice(0,4) +" at "+transaction.transaction_time.slice(11,16)}</td>
          <td>{transaction.from_account}</td>
          <td>{transaction.to_account}</td>
          <td>{transaction.tType}</td>
          <td>{transaction.amount}</td>
                </tr>
              ))}
              {withdrawals.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_time.slice(8,10)+"/"+transaction.transaction_time.slice(5,7)+"/"+transaction.transaction_time.slice(0,4) +" at "+transaction.transaction_time.slice(11,16)}</td>
          <td>{transaction.from_account}</td>
          <td>{transaction.to_account}</td>
          <td>{"Withdraw"}</td>
          <td>{transaction.amount*-1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
