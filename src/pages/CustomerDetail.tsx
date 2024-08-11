import React, { useEffect, useState } from 'react';
import { ref, set, push, update, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DatePickerComponent from '../components/DatePicker'; // Import your DatePickerComponent
import { Dayjs } from 'dayjs';

interface Service {
  id: string | null;
  serviceType: string;
  description: string;
  price: number;
}

const CustomerDetail: React.FC = () => {
  const location = useLocation();
  const { room } = location.state as { room: any };

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [customerID, setCustomerId] = useState<string>('');
  const [bookingId, setBookingId] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Default quantity
  const navigate = useNavigate();

  const customerId = location.state?.customerId || '';

  useEffect(() => {
    const servicesRef = ref(database, 'Services');

    const unsubscribe = onValue(servicesRef, (snapshot: DataSnapshot) => {
      const serviceList: Service[] = [];
      snapshot.forEach((childSnapshot) => {
        const serviceData = childSnapshot.val();
        serviceList.push({
          id: childSnapshot.key || '', 
          serviceType: serviceData.serviceType,
          description: serviceData.description,
          price: serviceData.price, // Correct field name
        });
      });
      setServices(serviceList);
    });

    return () => unsubscribe();
  }, []); // The dependency array is empty, so this runs only once after the initial render

  const handleSubmit = async () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    if (checkInDate.isAfter(checkOutDate)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    // Calculate the number of nights
    const nights = checkOutDate.diff(checkInDate, 'day');

    try {
      const newBookingRef = push(ref(database, 'Bookings'));
      await set(newBookingRef, {
        roomId: room.id,
        serviceId: selectedService,
        customerId: customerId,
        bookingId: newBookingRef.key,
        createdAt: new Date().toISOString(),
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        quantity,
        nights,
      });

      const roomRef = ref(database, `Rooms/${room.id}`);
      await update(roomRef, {
        quantity: room.quantity - quantity,
      });

      navigate('/list-booking', { state: { customerId } });
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Booking for Room {room.roomNumber}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Service</InputLabel>
          <Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as string)}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id || ''}>
                {service.serviceType} - ${service.price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePickerComponent
          value={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholder="Select Check-in Date"
        />
        <DatePickerComponent
          value={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholder="Select Check-out Date"
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Confirm Booking
        </Button>
      </Box>
    </Container>
  );
};

export default CustomerDetail;
