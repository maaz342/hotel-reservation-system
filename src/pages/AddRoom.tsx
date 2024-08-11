import React, { useState } from 'react';
import { Form, message, Card, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ref, set, push } from 'firebase/database';
import { database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import SelectComponent from '../components/Select';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddRoom: React.FC = () => {
    const [staffId, setStaff] = useState<string>('');
    const [roomNumber, setRoomno] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const newRoomRef = push(ref(database, 'Rooms'));
            await set(newRoomRef, {
                roomNumber,
                type,
                quantity,
                status,
                price,
                createdAt: new Date().toISOString()
            });

            message.success('Room added successfully!');
            navigate("/");
        } catch (error) {
            console.error('Registration error:', error);
            message.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-center mb-4'>
                Add Room
            </h1>
            <Card className="p-4 border" style={{ maxWidth: '500px', width: '100%' }}>
                <Form layout="vertical">
                    <Form.Item label="Room Number">
                        <InputComponent value={roomNumber} onChange={(e) => setRoomno(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Type">
                        <InputComponent value={type} onChange={(e) => setType(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Status">
                        <SelectComponent
                            value={status}
                            onChange={(value) => setStatus(value)}
                            options={[
                                { label: 'Available', value: 'Available' },
                                { label: 'Not Available', value: 'Not Available' }
                            ]}
                            placeholder="Select a Status"
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <InputNumber
                            min={0}
                            value={price}
                            onChange={(value) => setPrice(value ?? 0)} 
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <InputNumber
                            min={0}
                            value={quantity}
                            onChange={(value) => setQuantity(value ?? 0)} 
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent onClick={handleRegister}>Add Room</ButtonComponent>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddRoom;
