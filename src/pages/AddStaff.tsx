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

const AddStaff: React.FC = () => {
    const [staffId, setStaff] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [Name, setName] = useState<string>('');
    const [Role, setRole] = useState<string>('');
    const [Department, setDepartment] = useState<string>('');
    const [ContactInfo, setContactInfo] = useState<number>(0);
    const [shiftTiming, setShift] = useState<string>('');

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const newStaffRef = push(ref(database, 'Staff'));
            await set(newStaffRef, {
                staffId,
                quantity, 
                Name,
                Role,
                Department,
                ContactInfo,
                shiftTiming,
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
                    <Form.Item label="StaffId">
                    <InputNumber
                            min={0}
                            value={staffId}
                            onChange={(value) => setStaff(value ?? 0)} 
                            style={{ width: '100%' }}
                        />                    </Form.Item>
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
                            value={staffId}
                            onChange={(value) => setStaff(value ?? 0)} 
                            style={{ width: '100%' }}
                        />                          </Form.Item>
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
                        <ButtonComponent onClick={handleRegister}>Register</ButtonComponent>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddStaff;
