import React, { useEffect, useState } from 'react';
import { ref, update, get, DataSnapshot, onValue } from 'firebase/database';
import { database } from '../firebase-config'; 
import { Container, Box, Typography, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';

interface Booking {
  id: string;
  roomId: string;
  serviceId: string;
  customerId: string;
  bookingId: string;
  createdAt: string;
  checkInDate: string;
  checkOutDate: string;
  quantity: number;
  nights: number;
  payment?: boolean; // Optional payment field
}

const Payment: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const bookingsRef = ref(database, 'Bookings');

    const unsubscribe = onValue(bookingsRef, (snapshot: DataSnapshot) => {
      const bookingList: Booking[] = [];
      snapshot.forEach((childSnapshot) => {
        const bookingData = childSnapshot.val();
        // Check if payment field exists or not
        if (!bookingData.payment) { // Filter out already paid bookings
          bookingList.push({
            id: childSnapshot.key as string,
            ...bookingData
          });
        }
      });
      setBookings(bookingList);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePayment = async () => {
    if (!selectedBookingId) {
      alert('Please select a booking ID.');
      return;
    }

    try {
      setIsLoading(true);
      const bookingRef = ref(database, `Bookings/${selectedBookingId}`);
      const snapshot = await get(bookingRef); // Use `get` instead of `once`
      const bookingData = snapshot.val();

      // Check if the payment field exists and if it is true
      if (bookingData.payment) {
        alert('This booking has already been paid.');
        setIsLoading(false);
        return;
      }

      // Add payment field to the booking
      await update(bookingRef, {
        payment: true, // Mark the booking as paid
      });

      alert('Payment successfully processed!');
      setSelectedBookingId('');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Process Payment
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Booking ID</InputLabel>
          <Select
            value={selectedBookingId}
            onChange={(e) => setSelectedBookingId(e.target.value as string)}
          >
            {bookings.map((booking) => (
              <MenuItem key={booking.id} value={booking.id}>
                Booking ID: {booking.bookingId} - Room ID: {booking.roomId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Process Payment'}
        </Button>
      </Box>
    </Container>
  );
};

export default Payment;
