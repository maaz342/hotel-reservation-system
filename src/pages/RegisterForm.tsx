import React, { useState } from 'react';
import { Form, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import InputPasswordComponent from '../components/InputPass';
import SelectComponent from '../components/Select';
import DatePickerComponent from '../components/DatePicker';
import { Dayjs } from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [dob, setDob] = useState<Dayjs | null>(null);
  const navigate=useNavigate()

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        uid: user.uid,
        role,
        dob: dob ? dob.toISOString() : null,
        createdAt: new Date().toISOString()
      });

      message.success('Registration successful!');
      navigate("/")
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 border" style={{ maxWidth: '500px', width: '100%' }}>
        <Form layout="vertical">
          <Form.Item label="Email">
            <InputComponent value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </Form.Item>
          <Form.Item label="Password">
            <InputPasswordComponent value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Role">
            <SelectComponent
              value={role}
              onChange={(value) => setRole(value)}
              options={[
                { label: 'User', value: 'user' },
                { label: 'Admin', value: 'admin' }
              ]}
              placeholder="Select a role"
            />
          </Form.Item>
          <Form.Item label="Date of Birth">
            <DatePickerComponent value={dob} onChange={(date) => setDob(date)} placeholder="Select date" />
          </Form.Item>
          <Form.Item>
            <ButtonComponent onClick={handleRegister}>Register</ButtonComponent>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
