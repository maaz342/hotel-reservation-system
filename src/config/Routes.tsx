import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Login from '../pages/LoginForm';
import RegisterForm from '../pages/RegisterForm';
import Dashboard from '../pages/Dashboard';
import Navbar from '../layout/Navbar';
import AddRoom from '../pages/AddRoom';
import AddStaff from '../pages/AddStaff';
import EditRoom from '../pages/EditRoom';
import RoomList from '../pages/RoomList';
import StaffList from '../pages/StaffList';
import EditStaff from '../pages/EditStaff';
import AddService from '../pages/AddService';
import ServiceList from '../pages/ListService';
import EditService from '../pages/EditService';
import Booking from '../pages/Booking';
import CustomerDetail from '../pages/CustomerDetail';
import ListBooking from '../pages/ListBooking';
import Payment from '../pages/Payment';
import AddInventory from '../pages/AddInventory';
import InventoryList from '../pages/InventoryList';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoutes';
import { AuthContextProvider, useAuth } from '../context/AuthContext';
import Footer from '../layout/Footer';

const AppRouter: React.FC = () => {
  return (
    <AuthContextProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Router>
          <Navbar />
          <Box
            component="main"
            sx={{
              flex: '1 0 auto',
              p: 3,
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-room"
                element={
                  <AdminRoute>
                    <AddRoom />
                  </AdminRoute>
                }
              />
              <Route
                path="/add-staff"
                element={
                  <AdminRoute>
                    <AddStaff />
                  </AdminRoute>
                }
              />
              <Route
                path="/list-room"
                element={
                  <AdminRoute>
                    <RoomList />
                  </AdminRoute>
                }
              />
              <Route
                path="/edit-staff/:id"
                element={
                  <AdminRoute>
                    <EditStaff />
                  </AdminRoute>
                }
              />
              <Route
                path="/list-staff"
                element={
                  <AdminRoute>
                    <StaffList />
                  </AdminRoute>
                }
              />
              <Route
                path="/add-service"
                element={
                  <AdminRoute>
                    <AddService />
                  </AdminRoute>
                }
              />
              <Route
                path="/add-inventory"
                element={
                  <AdminRoute>
                    <AddInventory />
                  </AdminRoute>
                }
              />
              <Route
                path="/edit-room/:id"
                element={
                  <AdminRoute>
                    <EditRoom />
                  </AdminRoute>
                }
              />
              <Route
                path="/list-service"
                element={
                  <AdminRoute>
                    <ServiceList />
                  </AdminRoute>
                }
              />
              <Route
                path="/edit-service/:id"
                element={
                  <AdminRoute>
                    <EditService />
                  </AdminRoute>
                }
              />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-detail"
                element={
                  <ProtectedRoute>
                    <CustomerDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list-booking"
                element={
                  <AdminRoute>
                    <ListBooking />
                  </AdminRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list-inventory"
                element={
                  <AdminRoute>
                    <InventoryList />
                  </AdminRoute>
                }
              />
            </Routes>
          </Box>
          <Footer/>
        </Router>
      </Box>
    </AuthContextProvider>
  );
};

export default AppRouter;
