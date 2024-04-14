import { TextField, Button, Card, CardContent, Typography, Box, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useState } from 'react';

const Register = () => {
  const [notification, setNotification] = useState(null);

  // Function to handle registration form submission
  const handleRegister = async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match", severity: "error" });
      return;
    }

    try {
      const response = await axios.post('https://aliceserver.vercel.app/register', {
        username,
        email,
        password
      });

      console.log(response.data);
      setNotification({ message: 'Registration successful!', severity: 'success' });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Email or username already exists') {
        setNotification({ message: 'Username or email already exists', severity: 'error' });
      } else {
        setNotification({ message: 'An error occurred while registering. Please try again later.', severity: 'error' });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="outlined" sx={{ maxWidth: 400, margin: 'auto', marginTop: 4 }}>
        <CardContent sx={{ width: '90%', margin: 'auto' }}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Register
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="username"
              label="Username"
              fullWidth
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
            />
            <p></p>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister} // Call handleRegister function on button click
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={notification !== null}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        message={notification ? notification.message : ""}
        severity={notification ? notification.severity : "info"}
      />
    </motion.div>
  );
};

export default Register;
