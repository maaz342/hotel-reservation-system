import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 4,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.dark,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="div" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to providing the best service to our customers. Our application helps you manage and book rooms with ease.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: <a href="mailto:support@myapp.com" style={{ color: 'inherit' }}>support@myapp.com</a>
            </Typography>
            <Typography variant="body2">
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Follow Us
            </Typography>
            <Typography variant="body2">
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {/* You can replace these with actual social media icons if desired */}
                <Box component="span">Facebook</Box>
                <Box component="span">Twitter</Box>
                <Box component="span">Instagram</Box>
              </Box>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Hotel Managment System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
