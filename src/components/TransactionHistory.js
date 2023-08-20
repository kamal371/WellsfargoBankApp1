import React from 'react';
import "./TransactionHistory.css";
const transactions = [
  { id: 1, date: '2023-08-19',from:'00214214',to:'00313367', description: 'Groceries', amount: '-50.00' },
  { id: 2, date: '2023-08-20',from:'00928765',to:'00678345', description: 'Salary', amount: '1000.00' },
  // Add more transactions...
];

const TransactionHistory = () => {
  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
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
            <tr key={transaction.id}>
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
