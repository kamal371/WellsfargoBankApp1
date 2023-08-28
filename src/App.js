
import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
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
import TransactionBeneficiaryPage from './components/TransactionBeneficiaryPage';
import './components/TransactionBeneficiaryPage.css';
import TransactionPage from './components/TransactionPage';
//import './components/TransactionBeneficiaryPage.css';
import AccountSummary from './components/AccountSummary';
import './components/TransactionHistory.css';
import TransactionHistory from './components/TransactionHistory';
import WithdrawPage from './components/WithdrawPage';
import AccountSelection from './components/AccountSelection'
import AdminView from './components/Adminview.js';
import AddBeneficiaryPage from './components/AddBeneficiaryPage';
import Protected from './components/Protected';
import HomePage from './components/HomePage';

function App() {

  const [userName, setUserName] = useState('');
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },
    
    {
      path: "/dashboard",
      element: <><Navbar/><Protected Component = {Dashboard}/></>
    },
    {
      path: "/signup",
      element: <><Navbar/><Protected Component = {Signup}/></>
    },
    {
      path: "/admin",
      element: <><Navbar/><AdminLogin/></>
    },
    {
      path: "/admindashboard",
      element: <><Navbar/><Protected Component = {AdminDashboard}/></>
    },
    {
      path: "/create-account",
      element: <><Navbar/><Protected Component = {CreateAccount}/></>
    },
    {
      path: "/transaction-page",
      element: <><Navbar/><Protected Component = {TransactionPage}/></>
    },
    {
      path: "/transaction-beneficiary-page",
      element: <><Navbar/><Protected Component = {TransactionBeneficiaryPage}/></>
    },
    {
      path: "/account-summary",
      element: <><Navbar/><Protected Component = {AccountSummary}/></>
    },
    {
      path: "/transaction-history",
      element: <><Navbar/><Protected Component = {TransactionHistory}/></>
    },
    {
      path: "/withdraw-page",
      element: <><Navbar/><Protected Component = {WithdrawPage}/></>
    },
    {
      path: "/account-selection",
      element: <><Navbar/><Protected Component = {AccountSelection}/></>
    },
    {
      path: "/admin-view",
      element: <><Navbar/><Protected Component = {AdminView}/></>
    },
    {
      path: "/add-beneficiary",
      element: <><Navbar/><Protected Component = {AddBeneficiaryPage}/></>
    },
    {
      path :"/",
      element:<><Navbar/><Protected Component= {HomePage}/></>
    }
  ]);
  
  
  
  return (
   
      <div className="App">


        <RouterProvider router={router}/>

          
      </div>
    
  );
}

export default App;
