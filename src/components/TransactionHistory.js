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
  var debits = transactions.debits;
  var credits = transactions.credits;
  var withdrawals = transactions.withdrawals;

  const [balanceMessage,setBalanceMessage] = useState("please select an account");
  const [visible,setVisible] = useState(false);

  const handleAccountSelect = async (accountId) => {
    selected_acc = accountId;
    setSelectedAccountId(accountId);
    const result = await  axios.get("http://localhost:8080/account/read/"+accountId)
    console.log("balance is: Rs."+result.data.balance);
    console.log("Account id is: ",accountId);
    if(accountId){
      setBalanceMessage("Current Balance: Rs."+result.data.balance);
      setVisible(true);
    }
  };

const columns = [
  {label:"Transaction Time", accessor: "transaction_time",sortable:true},
  {label:"Payer", accessor: "payer",sortable:false},
  {label:"Payee", accessor: "payee",sortable:false},
  {label:"Type", accessor: "type",sortable:true},
  {label:"Amount", accessor: "amount",sortable:true},
];

// const TableHead = ({columns,handleSorting}) => {
//   const [sortField,setSortField] = useState("");
//   const [order, setOrder] = useState("asc");
// };

// const TableData = ({columns,tableData}) => {
//   return (
//     <tbody>
//       {tableData.map}
//     </tbody>
//   );
// };

// const handleSortingChange = (accessor) => {
//   const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
//   setSortField(accessor);
//   setOrder(sortOrder);
//   handleSorting(accessor,sortOrder);
// };

// const handleSorting = (sortField, sortOrder) => {
//   console.log(sortField,sortOrder)
// }



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
      <div>
            {visible && <h1>{balanceMessage}</h1>}
      </div>
      {/* <div className="table_container">
        <h1>Reusable sortable table with React</h1>
        <Table
          caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
          data={debits}
          columns={columns}
        />
      </div> */}
      <div className="transaction-tables">
        <div className="transaction-table">
          <h2>Transactions</h2>
          <table>
            
            
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
