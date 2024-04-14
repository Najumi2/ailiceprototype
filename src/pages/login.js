import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook

  const handleLogin = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('https://aliceserver.vercel.app/login', {
        email,
        password
      });

      console.log(response.data);
      // Redirect to /chat route upon successful login
      navigate('/chat');
    } catch (error) {
      console.error('Error logging in user:', error);
      if (error.response && error.response.status === 404 && error.response.data.error === 'No account exists with provided credentials') {
        // If no account exists, show a notification
        setNotification({ message: 'Please check your email, username, or password', severity: 'error' });
      } else {
        // If an error occurred, show a generic error notification
        setNotification({ message: 'An error occurred while logging in. Please try again later.', severity: 'error' });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="outlined" sx={{ maxWidth: 300, margin: 'auto', marginTop: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField id="email" label="Email/Username" fullWidth margin="normal" />
            <TextField id="password" label="Password" type="password" fullWidth margin="normal" />
            <p></p>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Login
            </Button>
          </form>
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

export default Login;
