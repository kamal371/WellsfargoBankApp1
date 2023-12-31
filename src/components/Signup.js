import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Avatar,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Adjust the primary color to match your design
    },
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const [customer_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    if (!email) {
      setErrors({ ...errors, email: 'Email is required' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const validatePhone = () => {
    if (contact < 1000 || contact > 9999) {
      setErrors({ ...errors, phone: 'Phone no must be 4 digits' });
    } else {
      setErrors({ ...errors, phone: '' });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    validateEmail();
    validatePassword();
    validatePhone();
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = {
          customer_name,
          password,
          email,
          contact,
        };
        const response = await axios.post('http://localhost:8080/customer/customers', data).catch(function (error) {
          if (error.response) {
            toast(error.response.data.message);
          }
        });

        if (response) {
          console.log('User registered successfully');
          window.alert('Successfully Registered');
          navigate('/login');
        } else {
          console.error('Error registering user');
          toast('Failed to register');
        }
      } catch (error) {
        console.error('Error:', error);
        toast(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="signup-container">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              label="Customer Name"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              value={customer_name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              required
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              margin="normal"
              fullWidth
              value={contact}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validatePhone}
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
