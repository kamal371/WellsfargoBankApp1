import React, { useState, useEffect } from "react";
import axios from "axios"; 
var balance,index;
const AccountSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(''); // Selected account state

  const [amount, setAmount] = useState("");
  const [accountOptions, setAccountOptions] = useState([]);
  const [fromAccountId, setFromAccountId] = useState("");
 
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [displayedValue, setDisplayedValue] = useState('');
  
   useEffect(() => {
     fetchAccountOptions();
   }, []);
   const handleClick = () => {
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
        setDisplayedValue("Please select an account");
    } else {
        setDisplayedValue("Current Balance is: Rs."+accountOptions[index].balance);
    }
    window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
    var resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
    console.log("account balance in AccountSelection.js :",resp_account_balance);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    console.log("event.target.value :",event.target.value);
    console.log("type of event.target.value :",Object.prototype.toString.call(event.target.value));
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
        console.log(response.data[i]);
        accountids[i] = response.data[i];
      }
      console.log(accountids);
      setAccountOptions(accountids); // Assuming the response contains account data
    } catch (error) {
      console.error("Error fetching account options:", error);
    }
  };
  return (
    <div>
      {/* <h2>Select an Account</h2>
      <label htmlFor="accountSelect">Choose an account:</label> */}
      {/* <select id="accountSelect" value={selectedAccount} onChange={handleAccountChange}> */}
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
      {/* {selectedAccount && <p>Selected account: {selectedAccount}</p>} */}
      <div className="check_balance">
            {/* <CheckBalance/> */}
            <button onClick={handleClick}>Check Balance</button>

           
         {isButtonClicked && <p>{displayedValue}</p>}
        </div>
    </div>
  );
};

export default AccountSelection;
