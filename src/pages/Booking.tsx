import React, { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

interface Room {
  id: string | null;
  roomNumber: number;
  price: number;
  status: boolean;
  type: string;
  quantity: number;
  image: string; 
}

const DEFAULT_IMAGE_URL = 'data:image/jpeg;base64,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';

const Booking: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const customerId = location.state?.customerId || '';

  console.log('Customer ID:', customerId);

  useEffect(() => {
    const roomsRef = ref(database, 'Rooms');

    const unsubscribe = onValue(roomsRef, (snapshot: DataSnapshot) => {
      const roomList: Room[] = [];
      snapshot.forEach((childSnapshot) => {
        const roomData = childSnapshot.val();
        roomList.push({
          id: childSnapshot.key,
          roomNumber: roomData.roomNumber,
          price: roomData.price,
          status: roomData.status,
          type: roomData.type,
          quantity: roomData.quantity,
          image: roomData.image || DEFAULT_IMAGE_URL // Use default image if no image URL is provided
        });
      });
      setRooms(roomList);
    });

    return () => unsubscribe();
  }, []); // Ensure this hook only runs on mount

  const handleBook = (room: Room) => {
    navigate(`/customer-detail`, { state: { room, customerId } });
  };

  return (
    <Container className="mt-4">
      <h1>
        ROOMS AVAILABLE
      </h1>
      <Box sx={{ my: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {rooms.map((room) => (
          <Card
            key={room.id}
            sx={{
              maxWidth: 600, // Increase card width
              height: 'auto', // Allow card height to extend as needed
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 3, // Add shadow for better visibility
              transition: 'transform 0.3s ease-in-out', // Add a transition effect
              '&:hover': {
                transform: 'scale(1.05)', // Slightly enlarge card on hover
              },
            }}
            onClick={() => handleBook(room)}
          >
            <CardMedia
              component="img"
              height="240" // Increase image height
              image={room.image} // Image specific to each room or default image
              alt={`Room ${room.roomNumber}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.5)',
              }}
            />
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                color: 'white',
                padding: 3, 
              }}
            >
              <Typography gutterBottom variant="h4" component="div">
                Room {room.roomNumber}
              </Typography>
              <Typography variant="body1" color="inherit">
                Type: {room.type}
              </Typography>
              <Typography variant="body1" color="inherit">
                Price: ${room.price}
              </Typography>
              <Typography variant="body1" color="inherit">
                Status: {room.status ? 'Available' : 'Not Available'}
              </Typography>
              <Typography variant="body1" color="inherit">
                Quantity: {room.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Booking;
