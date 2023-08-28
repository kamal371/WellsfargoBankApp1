
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import './Adminview.css';
import './SmallButton.css';
import { useNavigate } from 'react-router-dom';
var index,username_loaded_only_once,stored_account_id;
const AdminView = () =>{
  const navigate = useNavigate(); // Access the navigate function
    // variables for editing
    const [accountNumber, setAccountNumber] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const [customerId,setCustomerId]=useState("");

    const [transactions, setTransactions] = useState([]);

    const [accountType, setAccountType] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [userName,setUserName]=useState("");
    const [selectedAccount, setSelectedAccount] = useState(''); // Selected account state
    const [accountOptions, setAccountOptions] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [displayedValue, setDisplayedValue] = useState('');

    const [email, setIsEmail] = useState("");
    const [contact, setContact] = useState('');

    const handleUsername = () => {
      // Change the value here
      console.log("username in adminview.js :",userName);
      username_loaded_only_once=userName;
      console.log("username_loaded_only_once in adminview.js :",username_loaded_only_once);
    };

    const handleAccountStatus = async (index) => {
        // if(accountStatus===1){
        //   setAccountStatus(0);
        // }
        // else{
        //   setAccountStatus(1);
        // }
        // endpoint http://localhost:8080/admin/customer/
        console.log("stored_account_id in handleAccountStatus func. in adminview.js :",stored_account_id)
        console.log("accountStatus before clicking handleAccountStatus in adminview.js :",accountStatus)
        const delete_account = await axios.delete("http://localhost:8080/admin/customer/"+stored_account_id);
        setAccountStatus(delete_account.data.activity);
        console.log("delete_account axios call response in adminview.js :",delete_account);
        console.log("accountStatus after clicking handleAccountStatus in adminview.js :",accountStatus);
     };

    useEffect(() => {
        fetchAccountOptions();
      }, []);


      const handleClick = async() => {
       // Update state to indicate button was clicked and set the value to display
       setIsButtonClicked(true);
       var dotat = 0;
       for(let i=0;i<selectedAccount.length;i++){
           if(selectedAccount.charAt(i) === '.'){
               dotat = i;
           }
       }
       index = parseInt(selectedAccount.slice(0,dotat));
       console.log(index);
       if(isNaN(index)){
           setDisplayedValue("Please select an account");
       } else {
         //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
         window.sessionStorage.setItem("account_id",accountOptions[index].account_id);//kamal-change-for-seesionstorage
         
         stored_account_id=window.sessionStorage.getItem("account_id");
         console.log("stored acct id from window ",stored_account_id);
         const resulta = await  axios.get("http://localhost:8080/account/read/"+stored_account_id)

         var stored_customer_id=window.sessionStorage.getItem("admin_customer_id");
          const result_customer= await axios.get("http://localhost:8080/customer/customer/"+stored_customer_id)
         console.log("result_customer response ",result_customer.data);
         setAccountBalance(resulta.data.balance);
         setAccountNumber(resulta.data.account_id);
         setAccountStatus(resulta.data.activity);
         setAccountType(resulta.data.accountType);

         setSelectedAccount(stored_account_id);

         setIsEmail(result_customer.data.email);
         console.log("Customer email is in adminview.js ",result_customer.data.email);
         console.log("email in adminview.js ",email);
         setContact(result_customer.data.contact);

        //  var a=window.sessionStorage.getItem("userId");//customer_id
        //  setCustomerId(a);
        //  console.log(a);
        //  var b=window.sessionStorage.getItem("customer_name");//customer_name
        //  setUserName(b);
        //  console.log(b);

         setCustomerId(resulta.data.customer_id);
         setUserName(resulta.data.username);
         setIsEmail()
           setDisplayedValue("Current Balance is: Rs."+resulta.data.balance);
   
       }
   
       var account_id_sent=window.sessionStorage.getItem("account_id");
       console.log("account ID in AccountSelection.js :",account_id_sent);
   
       var resp_account_balance=window.sessionStorage.getItem("resp_account_balance");
       console.log("account balance in AccountSelection.js :",resp_account_balance);
     };


   
     const handleAccountChange = (event) => {
       setSelectedAccount(event.target.value);
      //  console.log("event :",event);
      //  console.log("event.target :",event.target);
      //  console.log("event.target.value :",event.target.value);
      //  window.sessionStorage.setItem("accountDetails",event.target.value);
   
       // window.sessionStorage.setItem("account_id_for_account_summary",accountOptions[index].account_id);
         
       // var account_id_for_account_summary=window.sessionStorage.getItem("account_id_for_account_summary");
       // console.log("stored acct id from window for account summary",account_id_for_account_summary);
   
      //  console.log("event.target.value :",event.target.value);
      //  console.log("type of event.target.value :",Object.prototype.toString.call(event.target.value));
       //window.sessionStorage.setItem("customer_account_id",accountOptions[index].account_id);
       //window.sessionStorage.setItem("resp_account_balance",accountOptions[index].balance);
       //console.log("account_id :",window.sessionStorage.getItem("customer_balance"));
     };

     useEffect(() => {
      console.log("selectedAccount in useEffect in adminview.js :",selectedAccount);
      if (selectedAccount !== '') {
        fetchTransactions(selectedAccount);
      }
    }, [selectedAccount]);

    console.log("selectedAccount in adminview.js :",selectedAccount);

     const fetchAccountOptions = async () => {
       try {
         var userId=window.sessionStorage.getItem("admin_customer_id");
         console.log("var in fetchAccountOptions func. in adminview.js ",userId);
        //  console.log("user id in adminview is: "+userId);
         const response = await axios.get("http://localhost:8080/account/readCustomer/"+userId); // Replace with your endpoint
        //  console.log("Kamal's acciynts")
        //  console.log("response :",response);
        //  console.log("response.data :",response.data);
         var accounts = response.data
         console.log(accounts.length)
         var accountids =  [];
         for(let i=0;i<accounts.length;i++){
           //console.log(response.data[i]);
           accountids[i] = response.data[i];
         }
         console.log(accountids);
         setAccountOptions(accountids); // Assuming the response contains account data
       } catch (error) {
         console.error("Error fetching account options:", error);
       }
     };

     const handleBackClick = async (index) => {
      //console.log(`View clicked for row ${index}`);
      // Implement your delete logic here
      navigate('/admindashboard');
    };

   
  const fetchTransactions = async (accountId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/transaction/` + accountId
      );
      console.log('transactions', response.data);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  
    return (
        <div className="Adminview-container">
          <div className="small-button">
            <button style={{ width: "100px", height: "50px",}} onClick={() => handleBackClick(index)}>Back</button>
          </div>
            <div className="editing-username">
                <table>
                    <tr>
                        <th>Customer Name</th>
                        <td>{userName}</td>
                        {/* <td>
                            <div className="button-container">
                            <button onClick={() => handleUsername(index)}>Edit Username</button>
                            </div>
                        </td> */}
                    </tr>
                    <tr>
                        <th>Customer ID</th>
                        <td>{customerId}</td>
                    </tr>
                    {/* <tr>
                        <th>Email ID</th>
                        <td>{email}</td>
                    </tr> */}
                    <tr>
                        <th>Contact</th>
                        <td>{contact}</td>{/* change this to Contact */}
                    </tr>
                </table>
                {/* <p>Value: {value}</p>
                <button onClick={handleChangeValue}>Change Value</button> */}
            </div>
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
          {/* <tr>
            <th>Customer ID</th>
            <td>{customerId}</td>
          </tr> */}
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
            <td>
                 <div className="button-container">
                    <button onClick={() => handleAccountStatus(index)}>Change Account Status</button>
                </div>
            </td>
          </tr>
        </table>
    </div>


    <div className="transaction-tables">
        <div className="transaction-table">
          <h2>All Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction Time</th>
                <th>From Account</th>
                <th>To Account</th>
                <th>Transaction Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
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
export default AdminView;



