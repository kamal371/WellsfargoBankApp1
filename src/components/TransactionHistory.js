// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TransactionHistory.css';

// var selected_acc;

// const TransactionHistory = () => {
//   const [selectedAccountId, setSelectedAccountId] = useState('');
//   const [accountOptions, setAccountOptions] = useState([]);
//   const [transactions, setTransactions] = useState({
//     debits: [],
//     credits: [],
//     withdrawals: [],
//   });


//   useEffect(() => {
//     fetchAccountOptions();
//   }, []);

//   useEffect(() => {
//     if (selectedAccountId !== '') {
//       fetchTransactions();
//     }
//   }, [selectedAccountId]);

//   const fetchAccountOptions = async () => {
//     try {
//       var userId = window.sessionStorage.getItem('userId');
//       const response = await axios.get(
//         'http://localhost:8080/account/readCustomer/' + userId
//       );
//       console.log(response.data);
//       var accounts = response.data;
//       var accountids = accounts.map((account) => account.account_id);
//       setAccountOptions(accountids);
//     } catch (error) {
//       console.error('Error fetching account options:', error);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/customer/transaction/` + selected_acc
//       );
//       console.log("transactions")
//       console.log(response.data);
//       setTransactions(response.data); // Assuming the response contains transaction data
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const handleAccountSelect = (accountId) => {
//     selected_acc = accountId;
//     setSelectedAccountId(accountId);
//   };

//   const debits = transactions.debits;
// const credits = transactions.credits;
// const withdrawals = transactions.withdrawals;


//   return (
//     <div className="transaction-history">
//       <h1>Transaction History</h1>
//       <div className="account-dropdown">
//         <label>Select Account:</label>
//         <select
//           value={selectedAccountId}
//           onChange={(e) => handleAccountSelect(e.target.value)}
//         >
//           <option value="">Select an account</option>
//           {accountOptions.map((accountId) => (
//             <option key={accountId} value={accountId}>
//               {accountId}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="transaction-tables">
//         <div className="transaction-table">
//           <h2>Debits</h2>
//           <table>
//             {/* Table header */}
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>From Account</th>
//                 {/* <th>Password</th> */}
//                 <th>To Account</th>
//                 <th>Mode of Payment</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {debits.map((transaction) => (
//                 <tr key={transaction.transaction_id}>
//                   <td>{transaction.transaction_time}</td>
//                   <td>{transaction.from_account}</td>
//                   <td>{transaction.to_account}</td>
//                   <td>{transaction.tType}</td>
//                   <td>{transaction.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="transaction-table">
//           <h2>Credits</h2>
//           <table>
//             {/* Table header */}
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>From Account</th>
//                 {/* <th>Password</th> */}
//                 <th>To Account</th>
//                 <th>Mode of Payment</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {credits.map((transaction) => (
//                 <tr key={transaction.transaction_id}>
//                 <td>{transaction.transaction_time}</td>
//         <td>{transaction.from_account}</td>
//         <td>{transaction.to_account}</td>
//         <td>{transaction.tType}</td>
//         <td>{transaction.amount}</td>
//               </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="transaction-table">
//           <h2>Withdrawals</h2>
//           <table>
//             {/* Table header */}
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>From Account</th>
//                 {/* <th>Password</th> */}
//                 <th>To Account</th>
//                 <th>Mode of Payment</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {withdrawals.map((transaction) => (
//                <tr key={transaction.transaction_id}>
//                <td>{transaction.transaction_time}</td>
//        <td>{transaction.from_account}</td>
//        <td>{transaction.to_account}</td>
//        <td>Withdrawals</td>
//        <td>{transaction.amount}</td>
//              </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;

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
      const response = await axios.get(
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

  const debits = transactions.debits;
const credits = transactions.credits;
const withdrawals = transactions.withdrawals;


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
            <tbody>
              {debits.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_time}</td>
          <td>{transaction.from_account}</td>
          <td>{transaction.to_account}</td>
          <td>{transaction.tType}</td>
          <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="transaction-table">
          <h2>Credits</h2>
          <table>
            {/* Table header */}
            <tbody>
              {credits.map((transaction) => (
                <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_time}</td>
        <td>{transaction.from_account}</td>
        <td>{transaction.to_account}</td>
        <td>{transaction.tType}</td>
        <td>{transaction.amount}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="transaction-table">
          <h2>Withdrawals</h2>
          <table>
            {/* Table header */}
            <tbody>
              {withdrawals.map((transaction) => (
               <tr key={transaction.transaction_id}>
               <td>{transaction.transaction_time}</td>
       <td>{transaction.from_account}</td>
       <td>{transaction.to_account}</td>
       <td>{transaction.tType}</td>
       <td>{transaction.amount}</td>
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