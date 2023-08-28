import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import './Adminlogin.css'; // Assuming you have your CSS file for AdminLogin styling

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

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulated admin login logic
    if (username === 'admin' && password === 'admin123') {
      //console.log("before admin dashboard");
      navigate('/admindashboard');
      console.log("into admin dashboard");
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="login-container">
          <LockIcon className="lock-icon" />
          <Typography variant="h4" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && (
              <Typography variant="body2" color="error" className="error-message">
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="login-button"
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default AdminLogin;
