import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { ref, set, get, child } from 'firebase/database';
import { database } from '../firebase-config';

const EditRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize room state
  const [room, setRoom] = useState({
    roomNumber: '',
    price: '',
    status: 'Available',
    type: '',
    quantity: '',
  });

  useEffect(() => {
    if (id) {
      const roomRef = ref(database, `Rooms/${id}`);
      get(roomRef).then((snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.val();
          setRoom({
            roomNumber: roomData.roomNumber || '',
            price: roomData.price || '',
            status: roomData.status ? 'Available' : 'Not Available',
            type: roomData.type || '',
            quantity: roomData.quantity || '',
          });
        }
      });
    } else if (location.state?.room) {
      setRoom(location.state.room);
    }
  }, [id, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roomRef = ref(database, `Rooms/${id || Date.now().toString()}`);

    set(roomRef, {
      roomNumber: room.roomNumber,
      price: room.price,
      status: room.status === 'Available',
      type: room.type,
      quantity: room.quantity,
    }).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error updating room:', error);
    });
  };

  return (
    <Container className="mt-4">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Room' : 'Add Room'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Room Number"
            value={room.roomNumber}
            onChange={(e) => setRoom({ ...room, roomNumber: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            value={room.price}
            onChange={(e) => setRoom({ ...room, price: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Status"
            select
            value={room.status}
            onChange={(e) => setRoom({ ...room, status: e.target.value })}
            fullWidth
            margin="normal"
            required
            SelectProps={{
              native: true,
            }}
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </TextField>
          <TextField
            label="Type"
            value={room.type}
            onChange={(e) => setRoom({ ...room, type: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Quantity"
            value={room.quantity}
            onChange={(e) => setRoom({ ...room, quantity: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {id ? 'Update Room' : 'Add Room'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditRoom;
