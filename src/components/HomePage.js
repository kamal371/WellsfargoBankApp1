import React from 'react';
import {
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import bankimage  from './bank-image.jpg';
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledLogo = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
}));

const HomePage = () => {
  return (
    <StyledContainer component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
    <StyledLogo src={bankimage} alt="Bank Logo" />
        <Typography variant="h4" component="h1">
          Welcome to WELLS FARGO Bank
        </Typography>
        <Typography variant="h6" component="h2">
          Your Financial Partner
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We are dedicated to providing you with the best banking experience.
          Manage your accounts, transactions, and more, all in one place.
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default HomePage;
