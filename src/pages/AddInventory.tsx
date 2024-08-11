import React, { useState } from 'react';
import { Form, message, Card, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ref, set, push } from 'firebase/database';
import { database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import SelectComponent from '../components/Select';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddInventory: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const newBookRef = push(ref(database, 'Inventory'));
            await set(newBookRef, {
                name,
                quantity,
                status,
                createdAt: new Date().toISOString()
            });

            message.success('Inventory Added successfully!');
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to connect');
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className='text-center mb-4'>
                Add Inventory
            </h1>
            <Card className="p-4 border" style={{ maxWidth: '500px', width: '100%' }}>
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <InputComponent value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    </Form.Item>
                    
                    <Form.Item label="Status">
                        <SelectComponent
                            value={status}
                            onChange={(value) => setStatus(value)}
                            options={[
                                { label: 'Finished', value: 'Finished' },
                                { label: 'Almost Finished', value: 'Almost Finished' }
                            ]}
                            placeholder="Select a Status"
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
                        <ButtonComponent onClick={handleRegister}>Make Request</ButtonComponent>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

<<<<<<< HEAD
export default AddInventory;
=======
export default AddInventory;
>>>>>>> de6c4eb551df7366e74bda549af7f808b0af0d58
