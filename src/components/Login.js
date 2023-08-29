import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import LockIcon from '@mui/icons-material/Lock';
import BankImage from './bank-image.jpg'; // Replace with your bank's image
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#0047AB', // Professional blue color
    },
    error: {
      main: '#f44336', // Red
    },
  },
});

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const StyledForm = styled.form`
  width: 100%;
  margin-top: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const StyledErrorMessage = styled(Typography)`
  color: ${theme.palette.error.main};
  margin-top: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
`;

const StyledLockIcon = styled(LockIcon)`
  font-size: 3rem;
  color: ${theme.palette.primary.main};
  margin-bottom: 1rem;
`;

const Login = ({ setUserName }) => {
  const [userName, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

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
    window.sessionStorage.setItem("userName",userName);
    if (emailError === '' && passwordError === '') {
      try {
        const UserData = {
          userName,
          password,
        };
        const response = await axios.post('http://localhost:8080/authenticate', UserData).catch(function (error) {
          if (error.response) {
            toast(error.response.data.message);
          }
        });
        console.log(response)
        if (response.data) {
          window.sessionStorage.setItem('token', JSON.stringify(response.data));
          window.sessionStorage.setItem('userName', userName);
          navigate('/dashboard');
        } else {
          setLoginError('Invalid email or password');
          toast(""+response.error, {
            autoClose: 3000,
          });
        }
      } catch (error) {
        setLoginError('An error occurred');
        // toast(""+error, {
        //   autoClose : 3000,
        // });
       
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
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <StyledContainer maxWidth="xs">
        <StyledLockIcon />
        <Typography variant="h4" gutterBottom>
          Secure Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            type="email"
            value={userName}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            variant="outlined"
            fullWidth
            required
            error={!!emailError}
            helperText={emailError}
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            variant="outlined"
            fullWidth
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          {loginError && <StyledErrorMessage>{loginError}</StyledErrorMessage>}
          <StyledButton type="submit" variant="contained" color="primary" fullWidth>
            Login
          </StyledButton>
        </StyledForm>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Login;
