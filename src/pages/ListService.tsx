import React, { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { database } from '../firebase-config'; 
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Table, TableHead, TableBody, TableCell, TableRow, Button } from '@mui/material';

interface Service {
  id: string | null;
  serviceId: number;
  serviceType: number;
  description: string;
  price: number;
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const servicesRef = ref(database, 'Services');

    const unsubscribe = onValue(servicesRef, (snapshot: DataSnapshot) => {
      const servicesList: Service[] = [];
      snapshot.forEach((childSnapshot) => {
        const serviceData = childSnapshot.val();
        servicesList.push({
          id: childSnapshot.key,
          serviceId: serviceData.serviceId,
          price: serviceData.Price,
          description: serviceData.description,
          serviceType: serviceData.serviceType
        });
      });
      setServices(servicesList);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (service: Service) => {
    navigate(`/edit-service/${service.id}`, { state: { service } });
  };

  return (
    <Container className="mt-4">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Service List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ServiceId</TableCell>
              <TableCell>ServiceType</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.serviceId}</TableCell>
                <TableCell>{service.serviceType}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(service)}>
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

export default ServiceList;
