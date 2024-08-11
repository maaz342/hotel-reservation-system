import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css';

const CarouselComponent: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
      <Carousel autoplay style={{ height: '100%' }}>
        <div style={{ height: '100%' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKN4wL0OVMx2QzZtO1-rrZO-Sn1o8-pK7H6A&s"
            alt="First slide"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the container
            }}
          />
        </div>
        <div style={{ height: '100%' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe91lmkQ2L86B_0m3dPKjzK3lt13pD_BHxwg&s"
            alt="Second slide"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the container
            }}
          />
        </div>
        <div style={{ height: '100%' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHFyGj0c1K-Mk106ZGT-juvcp-4Z8aMocHw&s"
            alt="Third slide"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the container
            }}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
