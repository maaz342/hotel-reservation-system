import React, { useState } from 'react';
import { Form, message, Card } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import InputPasswordComponent from '../components/InputPass';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const usercredent = await signInWithEmailAndPassword(auth, email, password);
      const user = usercredent.user;
      message.success('Login successful!');
      navigate("/booking", { state: { customerId: user.uid } });
    } catch (error) {
      message.error('Login failed. Please try again.');
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
          <Form.Item>
            <ButtonComponent onClick={handleLogin}>Login</ButtonComponent>
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'center' }}>
              <span>Don't have an account? </span>
              <a href="/register" style={{ color: '#1890ff' }}>Register</a>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
