import React, { useState } from 'react';
import { Form, message, Card, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ref, set, push } from 'firebase/database';
import { auth, database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import InputPasswordComponent from '../components/InputPass';
import SelectComponent from '../components/Select';
import DatePickerComponent from '../components/DatePicker';
import { Dayjs } from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddService: React.FC = () => {
    const [serviceId, setserviceId] = useState<number>(0);
    const [serviceType, setserviceType] = useState<string>('');
    const [description, setdescription] = useState<string>('');
    const [Price, setprice] = useState<number>(0);

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const newServiceRef = push(ref(database, 'Services'));
            await set(newServiceRef, {
                serviceId,
                serviceType,
                description,
                Price,
                createdAt: new Date().toISOString()
            });

            message.success('Registration successful!');
            navigate("/");
        } catch (error) {
            console.error('Registration error:', error);
            message.error('Registration failed. Please try again.');
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
                            onChange={(value) => setserviceId(value ?? 0)} 
                            style={{ width: '100%' }}
                        />                    </Form.Item>
                    <Form.Item label="ServiceType">
                        <InputComponent value={serviceType} onChange={(e) => setserviceType(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <InputComponent value={description} onChange={(e) => setdescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Price">
                    <InputNumber
                            min={0}
                            value={Price}
                            onChange={(value) => setprice(value ?? 0)} 
                            style={{ width: '100%' }}
                        />   
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent onClick={handleRegister}>Add Service</ButtonComponent>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddService;
