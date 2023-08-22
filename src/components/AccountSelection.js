import React, { useState } from 'react';

const AccountSelection = () => {
  const [selectedAccount, setSelectedAccount] = useState(''); // Selected account state

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  return (
    <div>
      <h2>Select an Account</h2>
      <label htmlFor="accountSelect">Choose an account:</label>
      <select id="accountSelect" value={selectedAccount} onChange={handleAccountChange}>
        <option value="">Select an account</option>
        <option value="account1">Account 1</option>
        <option value="account2">Account 2</option>
        <option value="account3">Account 3</option>
        {/* Add more account options as needed */}
      </select>
      {selectedAccount && <p>Selected account: {selectedAccount}</p>}
    </div>
  );
};

export default AccountSelection;
