import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0047AB', // Professional blue color
    },
  },
});

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <LockIcon style={{ fontSize: '2rem', marginRight: '1rem' }} />
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Secure Banking
            </Link>
          </Typography>
          <Button color="inherit" component={Link} to="/login" startIcon={<LockIcon />}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup" startIcon={<CreateIcon />}>
            Signup
          </Button>
          <Button color="inherit" component={Link} to="/admin" startIcon={<AdminPanelSettingsIcon />}>
            Admin
          </Button>
          <IconButton color="inherit" component={Link} to="/profile">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
