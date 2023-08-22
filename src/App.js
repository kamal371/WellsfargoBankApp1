
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login.js';
import './components/Login.css';
import Signup from './components/Signup.js';
import './components/Signup.css';
import Dashboard from './components/Dashboard.js';
import './components/Dashboard.css';
import AdminDashboard from './components/Admindashboard';
import AdminLogin from './components/Adminlogin';
import './components/Admindashboard.css';
import './components/Adminlogin.css';
import CreateAccount from './components/CreateAccount';
import './components/CreateAccount.css';
import Navbar from './components/Navbar';
import TransactionPage from './components/TransactionPage';
import './components/TransactionPage.css';
import AccountSummary from './components/AccountSummary';
import './components/TransactionHistory.css';
import TransactionHistory from './components/TransactionHistory';
import WithdrawPage from './components/WithdrawPage';
import AccountSelection from './components/AccountSelection'

function App() {

  const [userName, setUserName] = useState('');
  
  const transactions = [
    {
      date: '2023-08-20',
      description: 'Groceries',
      amount: '-$50.00',
    },
    {
      date: '2023-08-19',
      description: 'Salary',
      amount: '$1000.00',
    },
    // Add more transactions here
  ];
  
  return (
   
      <div className="App">

        <Navbar/>
       
          {/* <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/login">Login</Link></li>
              <li className="nav-item"><Link to="/signup">Signup</Link></li>
              <li className="nav-item"><Link to="/admin">Admin</Link></li>
            </ul>
          </nav> */}
          

        <Routes>
          <Route path="/login" element={<Login setUserName={setUserName}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/transaction-page" element={<TransactionPage />} />
          <Route path="/account-summary" element={<AccountSummary />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/withdraw-page" element={<WithdrawPage />} />
          <Route path="/account-selection" element={<AccountSelection />} />
        </Routes>
      </div>
    
  );
}

export default App;
