import React, { useState } from 'react';

const WithdrawPage = () => {
  const [balance, setBalance] = useState(1000); // Initial balance
  const [withdrawAmount, setWithdrawAmount] = useState(0); // Withdrawal amount state

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prevBalance => prevBalance - withdrawAmount);
      setWithdrawAmount(0); // Reset withdrawal amount after successful withdrawal
    } else {
      alert('Invalid withdrawal amount or insufficient balance.');
    }
  };

  return (
    <div>
      <h2>Withdraw </h2>
      <p>Account Balance: {balance}</p>
      <input
        type="number"
        placeholder="Enter withdrawal amount"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
      />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default WithdrawPage;
