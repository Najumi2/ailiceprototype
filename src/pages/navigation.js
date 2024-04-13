import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [selected, setSelected] = useState('/login');

  const handleNavigationChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <ToggleButtonGroup value={selected} exclusive onChange={handleNavigationChange}>
        <ToggleButton value="/login" component={Link} to="/login" variant="contained" color="primary">
          Login
        </ToggleButton>
        <ToggleButton value="/register" component={Link} to="/register" variant="contained" color="primary">
          Register
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Navigation;
