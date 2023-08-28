import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from 'axios';
import Navbar from './Navbar';

function Login({setUserName}) {
  //sessionStorage.clear()
  const [userName, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  //sessionStorage.removeItem("userName");
  
  const navigate = useNavigate(); // Access the navigate function

  


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userName)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if(password===null){
      setPasswordError('');
    }
    else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };
  
  // useEffect(() => {
  //   handleSubmit();
  //  // fetchAccountOptions();
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (emailError === '' && passwordError === '') {
      //sessionStorage.clear();
        try {
           // const response = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`);
           const UserData={
            userName,
            password
           };
           console.log(JSON.stringify(UserData))
           const response = await axios.post('http://localhost:8080/authenticate',UserData);
           console.log(response);
           window.sessionStorage.setItem("token", JSON.stringify(response.data));
           window.sessionStorage.setItem("userName", userName)
           console.log(userName);
           console.log(JSON.stringify(response.data))
           //const user = response.data.find((user) => user.email === email && user.password === password);
            // if (response.data.length > 0) {
              // User found
            if(response.data)
            {
              console.log('Login successful');
              
              //setUserName(user.name); // Set user's name in state or context
              
              navigate('/dashboard');
            } else {
              // User not found
              setLoginError('Invalid email or password');
              console.log('Invalid credentials');
            }
            
            // const response1 = await axios.post('http://localhost:8080/customer/getaccount',
            // JSON.parse(JSON.stringify(response.data)));
            // console.log("below is response1")
            // console.log(response1.data)
            // if(response1.data){
            //   navigate('/dashboard');
            // } else {
            //   navigate('/create-account');
            // }
          } catch (error) {
            setLoginError('An error occurred');
            console.error('Error:', error);
            
          }
    }
  };

  // useEffect for form validation
  useEffect(() => {
    validateEmail();
    validatePassword();
  }, [userName, password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <FormContainer>
        <LockOutlinedIcon style={{ color: '#e53935' }} />
        <RedTypography component="h1" variant="h5">
          Login
        </RedTypography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            autoFocus
          />
          {emailError && <span className="error-message">{emailError}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
          {loginError && <span className="error-message">{loginError}</span>}
          <RedSubmitButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </RedSubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
}

export default Login;
