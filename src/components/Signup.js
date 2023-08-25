// import React, { useState } from 'react';
// import axios from "axios";
// import './Signup.css'; // You can create this CSS file for styling

// function Signup() {
//   const [customer_name, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [customerId,setCustomerId]=useState('');
//   //some default value
//   //const [confirmPassword, setConfirmPassword] = useState('');
//   // const [aadhar, setAadhar] = useState('');
//   // const [address, setAddress] = useState('');
//   // const [dob, setDob] = useState('');
//   const [contact, setPhone] = useState('');
  
//   const [errors, setErrors] = useState({});

//   const validateEmail = () => {
//     if (!email) {
//       setErrors({ ...errors, email: 'Email is required' });
//     } else {
//       setErrors({ ...errors, email: '' });
//     }
//   };

//   const validatePassword = () => {
//     if (password.length < 6) {
//       setErrors({ ...errors, password: 'Password must be at least 6 characters long' });
//     } else {
//       setErrors({ ...errors, password: '' });
//     }
//   };

//   // const validateAadhar = () => {
//   //   if (aadhar.length !== 14) {
//   //     setErrors({ ...errors, aadhar: 'Aadhar number must be 14 digits' });
//   //   } else {
//   //     setErrors({ ...errors, aadhar: '' });
//   //   }
//   // };

//   const validateForm = () => {
//     const validationErrors = {};
//     validateEmail();
//     validatePassword();
//     //validateAadhar();
    
//     // Implement more validation rules here

//     return validationErrors;
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validateForm();
    
// //     if (Object.keys(validationErrors).length === 0) {
      
// //     } else {
// //       setErrors(validationErrors);
// //     }
// //   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
  
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         let data = JSON.stringify({
//           customer_name:customer_name,
//           password:password,
//           email:email,
//           contact:contact,
//           customer_id:customerId
//         })
//         const response = await axios({url:'http://localhost:8080/admin/customer', 
//           method: 'POST',
//           data,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         console.log(response)
  
//         if (response) {
//           console.log('User registered successfully');
//           //java.lang.System.out.println("Successful");
//           window.alert("Successfully Registered");
//           // Optionally, you can redirect the user to another page
//         } else {
//           console.error('Error registering user');
//           window.alert("Failed to register");
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label>Customer name</label>
//           <input
//             type="text"
//             value={customer_name}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
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
//           {errors.password && <span className="error-message">{errors.password}</span>}
//         </div>
        
//         <div className="input-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             onBlur={validateEmail}
//             required
//           />
//           {errors.email && <span className="error-message">{errors.email}</span>}
//         </div>

//         <div className="input-group">
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             value={contact}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, CssBaseline, Typography, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

const BackgroundContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #ffeb3b 30%, #d32f2f 90%);
`;

const FormContainer = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(4)}px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  background-color: #d32f2f;
  color: #fff;

  &:hover {
    background-color: #b71c1c;
  }
`;

function Signup() {
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

  const validateForm = () => {
    const validationErrors = {};
    validateEmail();
    validatePassword();
    // Implement more validation rules here

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = JSON.stringify({
          customer_name: customer_name,
          password: password,
          email: email,
          contact: contact,
        });
        const response = await axios({
          url: 'http://localhost:8080/admin/customer',
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response);

        if (response) {
          console.log('User registered successfully');
          window.alert('Successfully Registered');
        } else {
          console.error('Error registering user');
          window.alert('Failed to register');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <BackgroundContainer>
      <CssBaseline />
      <FormContainer elevation={3}>
        <Avatar sx={{ bgcolor: '#d32f2f' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Customer name"
            value={customer_name}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            type="tel"
            value={contact}
            onChange={(e) => setPhone(e.target.value)}
          />
          <SubmitButton type="submit" fullWidth variant="contained">
            Sign Up
          </SubmitButton>
        </form>
      </FormContainer>
    </BackgroundContainer>
  );
}

export default Signup;
