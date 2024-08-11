import React, { useEffect, useState } from 'react';
import { Form, message, Card, InputNumber } from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import { database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';

const EditService: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const service = location.state?.service || {};
  const [serviceId, setServiceId] = useState<number>(service.serviceId || 0);
  const [serviceType, setServiceType] = useState<string>(service.serviceType || '');
  const [description, setDescription] = useState<string>(service.description || '');
  const [price, setPrice] = useState<number>(service.price || 0);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const serviceRef = ref(database, `Services/${id}`);
      get(serviceRef).then((snapshot) => {
        if (snapshot.exists()) {
          const serviceData = snapshot.val();
          setServiceId(serviceData.serviceId);
          setServiceType(serviceData.serviceType);
          setDescription(serviceData.description);
          setPrice(serviceData.Price);
        }
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const serviceRef = ref(database, `Services/${id}`);
      await set(serviceRef, {
        serviceId,
        serviceType,
        description,
        Price: price,
        updatedAt: new Date().toISOString()
      });

      message.success('Service updated successfully!');
      navigate("/list-service");
    } catch (error) {
      console.error('Update error:', error);
      message.error('Update failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 border" style={{ maxWidth: '500px', width: '100%' }}>
        <Form layout="vertical">
          <Form.Item label="ServiceId">
            <InputNumber
              min={0}
              value={serviceId}
              onChange={(value) => setServiceId(value ?? 0)}
              style={{ width: '100%' }}
              disabled
            />
          </Form.Item>
          <Form.Item label="ServiceType">
            <InputComponent value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <InputComponent value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price">
            <InputNumber
              min={0}
              value={price}
              onChange={(value) => setPrice(value ?? 0)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <ButtonComponent onClick={handleUpdate}>Update Service</ButtonComponent>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditService;
