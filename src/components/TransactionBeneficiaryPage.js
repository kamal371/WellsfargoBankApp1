import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TransactionBeneficiaryPage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from './SideNavbar';
const TransactionBeneficiaryPage = () => {
  // State variables for dropdown options and form inputs
  const [fromAccountOptions, setFromAccountOptions] = useState([]);
  const [toCustomerOptions, setToCustomerOptions] = useState([]);
  const [toAccountOptions, setToAccountOptions] = useState([]);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toCustomerId, setToCustomerId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [tType, setTransactionType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedToId, setSelectedToId] = useState('');
  const navigate = useNavigate();
  var from_customerid = sessionStorage.getItem("userId");
  
  // Fetch 'from account' and 'to customer' data when component mounts
  useEffect(() => {
    fetchFromAccountData();
    fetchToCustomerData();
  }, []);

  // Fetch 'to account' data when 'to customer' selection changes
  useEffect(() => {
    if (toCustomerId) {
      fetchToAccountData(toCustomerId);
    }
  }, [toCustomerId]);

  // Fetch 'from account' data from the backend
  const fetchFromAccountData = async () => {
    try {
  
      const response = await axios.get('http://localhost:8080/account/readCustomer/'+from_customerid); // Replace with actual endpoint
      console.log("list of accounts of the user ",response);
      setFromAccountOptions(response.data);
    } catch (error) {
      console.error('Error fetching from account data:', error);
    }
  };

  // Fetch 'to customer' data from the backend
  const fetchToCustomerData = async () => {
    try {

      const response = await axios.get('http://localhost:8080/customer/beneficiary/'+from_customerid); // Replace with actual endpoint
      setToCustomerOptions(response.data);
      
    } catch (error) {
      console.error('Error fetching to customer data:', error);
    }
  };

  // Fetch 'to account' data based on selected 'to customer' from the backend
  const fetchToAccountData = async () => {
    try {
      //console.log("tocustomerid",selectedToId);
      const response = await axios.get('http://localhost:8080/account/readCustomer/'+toCustomerId); // Replace with actual endpoint
      setToAccountOptions(response.data);
    } catch (error) {
      console.error('Error fetching to account data:', error);
    }
  };

  // Event handler for 'from account' dropdown change
  const handleFromAccountChange = event => {
    setFromAccountId(event.target.value);
  };

  // Event handler for 'to customer' dropdown change
  const handleToCustomerChange = event => {
   
    const selectedCustomerId = event.target.value;
    console.log(selectedCustomerId) 
    
    // Extract and store the toId from the selected customer
    setToCustomerId(selectedCustomerId);
    setToAccountId(''); // Clear the 'to account' selection when 'to customer' changes
    
  };

  // Event handler for 'to account' dropdown change
  const handleToAccountChange = event => {
    setToAccountId(event.target.value);
  };

  // Event handler for 'amount' input change
  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  // Event handler for 'transaction type' dropdown change
  const handleTransactionTypeChange = event => {
    setTransactionType(event.target.value);
  };

  // Event handler for 'remarks' input change
  const handleRemarksChange = event => {
    setRemarks(event.target.value);
  };

  // Event handler for 'instructions' input change
  const handleInstructionsChange = event => {
    setInstructions(event.target.value);
  };

  const handleAddBeneficiary = () => {
    
    navigate('/add-beneficiary'); 
  };
  

  // Event handler for form submission
  const handleSubmit = async event => {
    event.preventDefault();
    // Perform transaction submission logic here
    let backendTransactionType;
  if (tType === 'neft') {
    backendTransactionType = 0;
  } else if (tType === 'rtgs') {
    backendTransactionType = 1;
  } else if (tType === 'imps') {
    backendTransactionType = 2;
  }
    try {
      // Construct the transaction data object
      const transactionData = {
        from_account:fromAccountId,
        to_account:toAccountId,
        amount,
        tType : backendTransactionType,
      };

      // Make a POST request to the backend API for transaction submission
      const response = await axios.post('http://localhost:8080/customer/transaction', transactionData).catch(function (error) {
        if (error.response) {
          toast(error.response.data.message);
        }
      }); // Replace with actual endpoint
      console.log(response)
      if(response)
      {
        toast("Transaction Successfull");
        console.log('Transaction submitted:', response.data);
        setFromAccountId('');
  setToCustomerId('');
 setToAccountId('');
   setAmount('');
 setTransactionType('');
   setRemarks('');
   setInstructions('');
      }
    
      
    } catch (error) {
      toast('Error submitting transaction:', error);
     
      // Handle the error (e.g., show error message)
    }
  };

  return (
    <div>
      <SideNavbar />
      <ToastContainer></ToastContainer>
      <h1>Transaction Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for 'from account' */}
        <div>
          <label htmlFor="fromAccount">From Account:</label>
          <select id="fromAccount" value={fromAccountId} onChange={handleFromAccountChange}>
            <option value="">Select an account</option>
            {fromAccountOptions.map(account => (
              <option value={account.id}>
                {account.account_id}
              </option>
            ))}
          </select>
        </div>
        {/* Dropdown for 'to customer' */}
        <div>
          <label htmlFor="toCustomer">To Customer:</label>
          <select id="toCustomer" value={toCustomerId} onChange={handleToCustomerChange}>
            <option value="">Select a customer</option>
            {toCustomerOptions.map(customer => (
              <option value={customer.id.toid}>
                {customer.id.toId}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddBeneficiary}>Add Beneficiary</button>
        {/* Dropdown for 'to account' */}
        <div>
          <label htmlFor="toAccount">To Account:</label>
          <select id="toAccount" value={toAccountId} onChange={handleToAccountChange}>
            <option value="">Select an account</option>
            {toAccountOptions.map(account => (
              <option value={account.id}>
                {account.account_id}
              </option>
            ))}
          </select>
        </div>
        {/* Input field for 'amount' */}
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />
        </div>
        {/* Dropdown for 'transaction type' */}
        <div>
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            value={tType}
            onChange={handleTransactionTypeChange}
          >
            <option value="">Select a transaction type</option>
            <option value="neft">NEFT</option>
            <option value="rtgs">RTGS</option>
            <option value="imps">IMPS</option>
          </select>
        </div>
        {/* Input field for 'remarks' */}
        <div>
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
            placeholder="Enter remarks"
          />
        </div>
        {/* Input field for 'instructions' */}
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={handleInstructionsChange}
            placeholder="Enter instructions"
          />
        </div>
        {/* Submit button */}
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default TransactionBeneficiaryPage;
