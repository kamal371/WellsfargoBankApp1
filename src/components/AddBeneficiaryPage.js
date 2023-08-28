import React, { useState } from 'react';
import axios from 'axios';
import SideNavbar from './SideNavbar.js';

const AddBeneficiaryPage = () => {
  const [name, setBeneficiaryName] = useState('');
  const [nickname, setBeneficiaryNickname] = useState('');
  const [toId, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   const customerId = sessionStorage.getItem("userId");
    const id = {
        customerId,
        toId
    }
    const beneficiaryData = {
      id,
      nickname,
      name
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/customer/beneficiary', // Replace with your backend endpoint
        beneficiaryData
      );
    console.log(response.data);
      if (response.status === 200) {
        setSuccessMessage('Beneficiary added successfully.');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the beneficiary.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
    
      <SideNavbar />
      <h2>Add Beneficiary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Beneficiary Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setBeneficiaryName(e.target.value)}
          />
        </div>
        <div>
          <label>Beneficiary Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setBeneficiaryNickname(e.target.value)}
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={toId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button type="submit">Add Beneficiary</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AddBeneficiaryPage;
