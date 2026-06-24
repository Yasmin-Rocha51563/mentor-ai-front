import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import LoginForm from '../components/LoginForm.jsx';
import styles from './LoginPage.module.css'; 

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      console.log('Login efetuado com sucesso!');
      navigate('/home');
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Esqueci a senha');
  };

  const handleCreateAccount = () => {
    console.log('Navegando para o cadastro...');
    navigate('/register');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <Logo />
        </div>

        <h1 className={styles.heading}>
          Faça seu login para entrar na plataforma
        </h1>

        <LoginForm 
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onCreateAccount={handleCreateAccount}
        />
      </div>
    </div>
  );
};

export default Login;
