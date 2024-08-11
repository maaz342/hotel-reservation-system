import React, { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';

interface Room {
  id: string | null;
  roomNumber: number;
  price: number;
  status: boolean;
  type: string;
  quantity: number;
}

const RoomList: React.FC = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomsRef = ref(database, 'Rooms');

    const unsubscribe = onValue(roomsRef, (snapshot: DataSnapshot) => {
      const rooms: Room[] = [];
      snapshot.forEach((childSnapshot) => {
        const roomData = childSnapshot.val();
        rooms.push({
          id: childSnapshot.key,
          roomNumber: roomData.roomNumber,
          price: roomData.price,
          status: roomData.status,
          type: roomData.type,
          quantity: roomData.quantity
        });
      });
      setRoomList(rooms);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (room: Room) => {
    navigate(`/edit-room/${room.id}`, { state: { room } });
  };

  return (
    <Container className="mt-4">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Room List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.status ? 'Available' : 'Not Available'}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.quantity}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(room)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default RoomList;
