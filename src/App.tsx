import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import ButtonComponent from './components/Button';
import AppRouter from './config/Routes';
import Navbar from './layout/Navbar';

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
   <AppRouter/>
   </>

  );
};
export default App;

ReactDOM.render(<App />, document.getElementById('root'));
