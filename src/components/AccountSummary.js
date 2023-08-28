// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountSummary.css'
import SideNavbar from './SideNavbar';
var balance,index;
// Define the AccountSummary component
const AccountSummary =  () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [userName,setUserName]=useState("");
  const [customerId,setCustomerId]=useState("");
  //const [accountDetails,setAccountDetails]=useState("")

  //  var stored_account_id=window.sessionStorage.getItem("account_id");
  //  console.log("stored_account_id ",stored_account_id);
  // const result =  axios.get("http://localhost:8080/account/read/"+stored_account_id );

  // console.log("dashboard ",result);
  // customerID = result.data.customer_id;
  // customer_name = result.data.customer_name;
  // email = result.data.email;
  // contact = result.data.contact;

  const [selectedAccount, setSelectedAccount] = useState(''); // Selected account state

  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
 
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  //const [displayedValue, setDisplayedValue] = useState('');
  
   useEffect(() => {
     fetchAccountOptions();
   }, []);
   const handleClick = async() => {
    // Update state to indicate button was clicked and set the value to display
    setIsButtonClicked(true);
    var dotat = 0;
    for(let i=0;i<selectedAccount.length;i++){
        if(selectedAccount.charAt(i) == '.'){
            dotat = i;
        }
    }
    index = parseInt(selectedAccount.slice(0,dotat));
    console.log(index);
    if(isNaN(index)){
        //setDisplayedValue("Please select an account");
    } else {
      //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
      window.sessionStorage.setItem("account_id",accountOptions[index].account_id);
      
      var stored_account_id=window.sessionStorage.getItem("account_id");
      console.log("stored acct id from window ",stored_account_id);
      const resulta = await  axios.get("http://localhost:8080/account/read/"+stored_account_id)
      console.log("resulta response ",resulta.data);
      setAccountBalance(resulta.data.balance);
      setAccountNumber(resulta.data.account_id);
      setAccountStatus(resulta.data.activity);
      setAccountType(resulta.data.accountType);
      setCustomerId(resulta.data.customer_id);
      setUserName(resulta.data.username);
      
        //setDisplayedValue("Current Balance is: Rs."+resulta.data.balance);

    }

    var account_id_sent=window.sessionStorage.getItem("account_id");
    console.log("account ID in AccountSelection.js :",account_id_sent);

    var resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
    console.log("account balance in AccountSelection.js :",resp_account_balance);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    // console.log("event :",event);
    // console.log("event.target :",event.target);
    // console.log("event.target.value :",event.target.value);
    // window.sessionStorage.setItem("accountDetails",event.target.value);

    // window.sessionStorage.setItem("account_id_for_account_summary",accountOptions[index].account_id);
      
    // var account_id_for_account_summary=window.sessionStorage.getItem("account_id_for_account_summary");
    // console.log("stored acct id from window for account summary",account_id_for_account_summary);

    // console.log("event.target.value :",event.target.value);
    // console.log("type of event.target.value :",Object.prototype.toString.call(event.target.value));
    //window.sessionStorage.setItem("customer_account_id",accountOptions[index].account_id);
    //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
    //console.log("account_id :",window.sessionStorage.getItem("customer_balance"));
  };
  const fetchAccountOptions = async () => {
    try {
      var userId=window.sessionStorage.getItem("userId");
      console.log("user id is: "+userId);
      const response = await axios.get("http://localhost:8080/account/readCustomer/"+userId); // Replace with your endpoint
      console.log("Kamal's acciynts")
      console.log("response :",response);
      console.log("response.data :",response.data);
      var accounts = response.data
      console.log(accounts.length)
      var accountids =  [];
      for(let i=0;i<accounts.length;i++){
        //console.log(response.data[i]);
        if(response.data[i].activity===1){
          accountids[i] = response.data[i];
        }
      }
      console.log(accountids);
      setAccountOptions(accountids); // Assuming the response contains account data
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };

  return (
    <div className="account-summary">
      <SideNavbar />
    <h1>Account Summary</h1>
    <div className="form-group">
        <label>Select an Account</label>
        <select
          className="form-control"
          value={selectedAccount}
          onChange={handleAccountChange}
        >
          <option value="">Select an account</option>

          {accountOptions.map((account,index) => (
            <option key={account.id} value={account.id}>
              {index}. {account.account_id} - {account.accountType} 
             
            </option>
            
          ))}
        </select>
      </div>
      <div className="account_table">
      <button onClick={handleClick}>Check Account Details</button>
        <table>
          {/* <tr>
            <th>UserName</th>
            <td>{userName}</td>
          </tr> */}
          <tr>
            <th>Customer ID</th>
            <td>{customerId}</td>
          </tr>
          <tr>
            <th>Account Number</th>
            <td>{accountNumber}</td>
          </tr>
          <tr>
            <th>Account Balance</th>
            <td>{accountBalance}</td>
          </tr>
          <tr>
            <th>Account Type</th>
            <td>{accountType}</td>
          </tr>
          <tr>
            <th>Account Status</th>
            <td>{accountStatus}</td>
          </tr>
        </table>
    </div>
  </div>
);
};

export default AccountSummary;

