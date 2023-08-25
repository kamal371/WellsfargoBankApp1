// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // You can create this CSS file for styling
// import axios from 'axios';
// import Navbar from './Navbar';

// function Login({setUserName}) {

//   const [userName, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');

  
//   const navigate = useNavigate(); // Access the navigate function

  


//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(userName)) {
//       setEmailError('Please enter a valid email address');
//     } else {
//       setEmailError('');
//     }
//     console.log("validateemdail");
//   };

//   const validatePassword = () => {
//     if (password.length < 6) {
//       setPasswordError('Password must be at least 6 characters long');
//     } else {
//       setPasswordError('');
//     }
//     console.log("validatepassword");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     validateEmail();
//     validatePassword();

//     if (emailError === '' && passwordError === '') {
//         try {
//            // const response = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`);
//            const UserData={
//             userName,
//             password
//            };
//            console.log(JSON.stringify(UserData))
//            const response = await axios.post('http://localhost:8080/authenticate',UserData);
//            console.log(response);
//            window.sessionStorage.setItem("token", JSON.stringify(response.data));
//            window.sessionStorage.setItem("userName", userName)
//            console.log(userName);
//            console.log(JSON.stringify(response.data))
//            //const user = response.data.find((user) => user.email === email && user.password === password);
//             // if (response.data.length > 0) {
//               // User found
//             if(response.data)
//             {
//               console.log('Login successful');
//               //setUserName(user.name); // Set user's name in state or context
//               navigate('/dashboard');
//             } else {
//               // User not found
//               setLoginError('Invalid email or password');
//               console.log('Invalid credentials');
//             }
            
//             // const response1 = await axios.post('http://localhost:8080/customer/getaccount',
//             // JSON.parse(JSON.stringify(response.data)));
//             // console.log("below is response1")
//             // console.log(response1.data)
//             // if(response1.data){
//             //   navigate('/dashboard');
//             // } else {
//             //   navigate('/create-account');
//             // }
//           } catch (error) {
//             setLoginError('An error occurred');
//             console.error('Error:', error);
            
//           }
//     }
    
//   };

//   return (

//     <>
    
//     {/* <Navbar/> */}
   
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={userName}
//             onChange={(e) => setEmail(e.target.value)}
//             onBlur={validateEmail}
//             required
//           />
//           {emailError && <span className="error-message">{emailError}</span>}
//         </div>
//         <div className="input-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onBlur={validatePassword}
//             required
//           />
//           {passwordError && <span className="error-message">{passwordError}</span>}
//         </div>
//         {loginError && <span className="error-message">{loginError}</span>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//     </>
//   );
// }

// export default Login;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from 'axios';
import Navbar from './Navbar';

const FormContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const RedSubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  background-color: #e53935;
  color: #fff;

  &:hover {
    background-color: #c62828;
  }
`;

const RedTypography = styled(Typography)`
  color: #e53935;
`;

function Login({ setUserName }) {
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
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (emailError === '' && passwordError === '') {
      try {
        const UserData = {
          userName,
          password
        };

        const response = await axios.post('http://localhost:8080/authenticate', UserData);
        window.sessionStorage.setItem('token', JSON.stringify(response.data));
        window.sessionStorage.setItem('userName', userName);

        if (response.data) {
          console.log('Login successful');
          navigate('/dashboard');
        } else {
          setLoginError('Invalid email or password');
          console.log('Invalid credentials');
        }
      } catch (error) {
        setLoginError('An error occurred');
        console.error('Error:', error);
      }
    }
  };

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
