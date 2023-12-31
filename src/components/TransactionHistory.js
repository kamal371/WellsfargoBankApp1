// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './TransactionHistory.css';

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
//         `http://localhost:8080/customer/transaction/` + selectedAccountId
//       );
//       console.log('transactions');
//       console.log(response.data);
//       setTransactions(response.data); // Assuming the response contains transaction data
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const debits = transactions.debits || [];
//   const credits = transactions.credits || [];
//   const withdrawals = transactions.withdrawals || [];

//   return (
//     <div className="transaction-history">
//       <h1>Transaction History</h1>
//       <div className="account-dropdown">
//         <label>Select Account:</label>
//         <select
//           value={selectedAccountId}
//           onChange={(e) => setSelectedAccountId(e.target.value)}
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
//             <thead>
//               <tr>
//                 <th>Transaction Time</th>
//                 <th>From Account</th>
//                 <th>To Account</th>
//                 <th>Transaction Type</th>
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
//             <thead>
//               <tr>
//                 <th>Transaction Time</th>
//                 <th>From Account</th>
//                 <th>To Account</th>
//                 <th>Transaction Type</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {credits.map((transaction) => (
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
//           <h2>Withdrawals</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Transaction Time</th>
//                 <th>From Account</th>
//                 <th>To Account</th>
//                 <th>Transaction Type</th>
//                 <th>Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {withdrawals.map((transaction) => (
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
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';

const TransactionHistory = () => {
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [accountOptions, setAccountOptions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchAccountOptions();
  }, []);

  useEffect(() => {
    if (selectedAccountId !== '') {
      fetchTransactions(selectedAccountId);
    }
  }, [selectedAccountId]);

  const fetchAccountOptions = async () => {
    try {
      var userId = window.sessionStorage.getItem('userId');
      const response = await axios.get(
        'http://localhost:8080/account/readCustomer/' + userId
      );
      const accounts = response.data;
      const accountids = accounts.map((account) => account.account_id);
      setAccountOptions(accountids);
    } catch (error) {
      console.error('Error fetching account options:', error);
    }
  };

  const fetchTransactions = async (accountId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/transaction/` + accountId
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const [balanceMessage, setBalanceMessage] = useState('Please select an account');
  const [visible, setVisible] = useState(false);

  const handleAccountSelect = async (accountId) => {
    setSelectedAccountId(accountId);
    const result = await axios.get(`http://localhost:8080/account/read/${accountId}`);
    if (accountId) {
      setBalanceMessage(`Current Balance: Rs. ${result.data.balance}`);
      setVisible(true);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />
      <div style={{ flex: 1, marginLeft: '50px', padding: '20px' }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Transaction History
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Select Account:
              </Typography>
              <Select
                value={selectedAccountId}
                onChange={(e) => handleAccountSelect(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Select an account</MenuItem>
                {accountOptions.map((accountId) => (
                  <MenuItem key={accountId} value={accountId}>
                    {accountId}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              {visible && <Typography variant="h6">{balanceMessage}</Typography>}
            </div>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction Time</TableCell>
                  <TableCell>From Account</TableCell>
                  <TableCell>To Account</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.transaction_id}>
                    <TableCell>{transaction.transaction_time}</TableCell>
                    <TableCell>{transaction.from_account}</TableCell>
                    <TableCell>{transaction.to_account}</TableCell>
                    <TableCell>{transaction.tType}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default TransactionHistory;
