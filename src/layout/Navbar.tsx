import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hotel Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {currentUser && (
            <>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>

              {userRole === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/list-room">
                    Rooms
                  </Button>
                  <Button color="inherit" component={Link} to="/list-staff">
                    Staff
                  </Button>
                  <Button color="inherit" component={Link} to="/list-service">
                    Services
                  </Button>
                  <Button color="inherit" component={Link} to="/add-room">
                    Add Room
                  </Button>
                  <Button color="inherit" component={Link} to="/add-staff">
                    Add Staff
                  </Button>
                  <Button color="inherit" component={Link} to="/add-service">
                    Add Service
                  </Button>
                  <Button color="inherit" component={Link} to="/add-inventory">
                    Add Inventory
                  </Button>
                  <Button color="inherit" component={Link} to="/list-booking">
                    List Booking
                  </Button>
                  <Button color="inherit" component={Link} to="/list-inventory">
                    Inventory List
                  </Button>
                  <Button color="inherit" component={Link} to="/payment">
                    Payments
                  </Button>
                </>
              )}

              {userRole === 'user' && (
                <>
                  <Button color="inherit" component={Link} to="/booking">
                    Booking
                  </Button>
      
                </>
              )}
            </>
          )}

          {!currentUser ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
