import React, { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useLocation } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Booking {
  bookingid: string | null;
  checkinDate:string;
  checkOutDate:string;

  customerId: string;
  nights: number;
  roomId: string;
  serviceId:string;
  quantity: number;
}

const ListBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const location = useLocation();
  const customerId = location.state?.customerId; 

  useEffect(() => {
    if (!customerId) return; 

    const bookingsRef = ref(database, 'Bookings');

    const unsubscribe = onValue(bookingsRef, (snapshot: DataSnapshot) => {
      const bookingList: Booking[] = [];
      snapshot.forEach((childSnapshot) => {
        const bookingData = childSnapshot.val();
        if (bookingData.customerId === customerId) {
          bookingList.push({
            bookingid: childSnapshot.key,
            checkinDate: bookingData.checkInDate,
            checkOutDate: bookingData.checkOutDate,
            customerId: bookingData.customerId,
            nights: bookingData.nights,
            quantity: bookingData.quantity,
            roomId:bookingData.roomId,
            serviceId:bookingData.serviceId
          });
        }
      });
      setBookings(bookingList);
    });

    return () => unsubscribe();
  }, [customerId]);

  return (
    <Container className="mt-4">
      <Typography variant="h4" gutterBottom>
        Bookings for Customer ID: {customerId}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>BookingId</TableCell>
            <TableCell>RoomId</TableCell>

              <TableCell>Check In Date</TableCell>
              <TableCell>Check Out Date</TableCell>
              <TableCell>ServiceId</TableCell>
              <TableCell>Nights</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.bookingid}>
                <TableCell>{booking.bookingid}</TableCell>
                <TableCell>{booking.roomId}</TableCell>

                <TableCell>{booking.checkinDate}</TableCell>
                <TableCell>{booking.checkOutDate}</TableCell>
                <TableCell>${booking.serviceId}</TableCell>
                <TableCell>{booking.nights}</TableCell>
                <TableCell>{booking.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListBooking;
