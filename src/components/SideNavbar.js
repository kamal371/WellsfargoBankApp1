import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';
import WithdrawPage from './WithdrawPage.js';

const drawerWidth = 240;

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  marginTop: '64px', // Adjust the marginTop value as needed
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const SideNavbar = () => {
  return (
    <CustomDrawer variant="permanent">
      <div style={{ height: '120px' }} />
      <List>
        <ListItem button component={Link} to="/create-account">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Create Account" />
        </ListItem>
        <ListItem button component={Link} to="/account-summary">
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Account Summary" />
        </ListItem>
        <ListItem button component={Link} to="/transaction-page">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Internet Banking" />
        </ListItem>
        <ListItem button component={Link} to="/transaction-beneficiary-page">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Internet Banking with beneficiary" />
        </ListItem>
        <ListItem button component={Link} to="/transaction-history">
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary={<WithdrawPage />} />
        </ListItem>
        {/* Add more list items as needed */}
        <ListItem button component={Link} to="/login">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </CustomDrawer>
  );
};

export default SideNavbar;
