import React, { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';

interface Staff {
    id: string | null;
    staffId: number;
  Department: string;
  Role: string;
  shiftTiming: string;
  ContactInfo: string;
}

const StaffList: React.FC = () => {
  const [roomList, setRoomList] = useState<Staff[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const StaffRef = ref(database, 'Staff');

    const unsubscribe = onValue(StaffRef, (snapshot: DataSnapshot) => {
      const staff: Staff[] = [];
      snapshot.forEach((childSnapshot) => {
        const roomData = childSnapshot.val();
        staff.push({
            id: childSnapshot.key,
            staffId: roomData.staffId,
            Department: roomData.Department,
            Role: roomData.Role,
            shiftTiming: roomData.shiftTiming,
          ContactInfo: roomData.ContactInfo,
        });
      });
      setRoomList(staff);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (room: Staff) => {
    navigate(`/edit-staff/${room.id}`, { state: { room } });
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
              <TableCell>Staff Id</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomList.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.staffId}</TableCell>
                <TableCell>{room.Department}</TableCell>
                <TableCell>{room.Role}</TableCell>
                <TableCell>{room.shiftTiming}</TableCell>
                <TableCell>{room.ContactInfo}</TableCell>
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

export default StaffList;
