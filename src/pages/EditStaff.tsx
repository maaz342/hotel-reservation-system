import React, { useState, useEffect } from 'react';
import { Form, message, Card, InputNumber } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import SelectComponent from '../components/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@mui/material';

const EditStaff: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [staffId, setStaff] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [Name, setName] = useState<string>('');
    const [Role, setRole] = useState<string>('');
    const [Department, setDepartment] = useState<string>('');
    const [ContactInfo, setContactInfo] = useState<number>(0);
    const [shiftTiming, setShift] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const staffRef = ref(database, `Staff/${id}`);
            get(staffRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const staffData = snapshot.val();
                    setStaff(staffData.staffId || 0);
                    setQuantity(staffData.quantity || 0);
                    setName(staffData.Name || '');
                    setRole(staffData.Role || '');
                    setDepartment(staffData.Department || '');
                    setContactInfo(staffData.ContactInfo || 0);
                    setShift(staffData.shiftTiming || '');
                }
            }).catch((error) => {
                console.error('Error fetching staff data:', error);
                message.error('Failed to load staff data.');
            });
        }
    }, [id]);

    const handleUpdate = async () => {
        try {
            const staffRef = ref(database, `Staff/${id}`);
            await set(staffRef, {
                staffId,
                quantity,
                Name,
                Role,
                Department,
                ContactInfo,
                shiftTiming,
                updatedAt: new Date().toISOString()
            });

            message.success('Staff updated successfully!');
            navigate("/");
        } catch (error) {
            console.error('Update error:', error);
            message.error('Update failed. Please try again.');
        }
    };

    return (
        <>
        <Typography className='text-center' variant="h4" component="h1" gutterBottom>
Staff Edit        </Typography>
        <div className="d-flex justify-content-center align-items-center vh-100">
  
            <Card className="p-4 border" style={{ maxWidth: '500px', width: '100%' }}>
                <Form layout="vertical">
                    <Form.Item label="StaffId">
                        <InputNumber
                            min={0}
                            value={staffId}
                            onChange={(value) => setStaff(value ?? 0)} 
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Name">
                        <InputComponent value={Name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Role">
                        <InputComponent value={Role} onChange={(e) => setRole(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Department">
                        <InputComponent
                            value={Department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="ContactInfo">
                        <InputNumber
                            min={0}
                            value={ContactInfo}
                            onChange={(value) => setContactInfo(value ?? 0)} 
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Shift Timing">
                        <SelectComponent
                            value={shiftTiming}
                            onChange={(value) => setShift(value)}
                            options={[
                                { label: 'Morning 12-6', value: '12-6' },
                                { label: 'Evening 6-12', value: '6-12' }
                            ]}
                            placeholder="Select a Time"
                        />
                    </Form.Item>
                    <Form.Item>
                        <ButtonComponent onClick={handleUpdate}>Update</ButtonComponent>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        </>

    );
};

export default EditStaff;
