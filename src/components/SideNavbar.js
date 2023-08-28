// import React from 'react';
// import { Link } from 'react-router-dom';
// import WithdrawPage from './WithdrawPage'; // Import your WithdrawPage component here

// const SideNavbar = () => {
//   return (
//     <nav>
//       <div className="sidebar">
//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/create-account">Create Account</Link>
//           </li>
//           <li>
//             <Link to="/account-summary">Account Summary</Link>
//           </li>
//           <li>
//             <Link to="/transaction-page">Internet Banking</Link>
//           </li>
//           <li>
//             <Link to="/transaction-beneficiary-page">Internet Banking with beneficiary</Link>
//           </li>
//           <li>
//             <Link to="/transaction-history">Transaction History</Link>
//           </li>
//           <li>
//             <WithdrawPage />
//           </li>
//           <li>
//             <Link to="/login">Log Out</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default SideNavbar;

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
import WithdrawPage from './WithdrawPage';

const drawerWidth = 240;

const SideNavbar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <div sx={{ height: '64px' }} />
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
        <ListItem button component={Link} to="/login">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNavbar;
