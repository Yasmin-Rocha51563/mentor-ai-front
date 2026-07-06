import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import LoginForm from '../components/LoginForm.jsx';
import styles from './LoginPage.module.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  
  const handleLogin = async ({ email, password }) => {
    setErro('');
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email, 
          senha: password 
        }),
      });

      if (!response.ok) {
      let mensagemErro = 'Erro ao fazer login.';
      try {
        const dadosErro = await response.json();
        mensagemErro = dadosErro.mensagem || mensagemErro;
      } catch (e) {
      }
      throw new Error(mensagemErro);
    }

      const dados = await response.json();
      console.log("Saída JSON (Sucesso):", JSON.stringify(dados, null, 2));

      //guarda o Token JWT e o ID do usuario de forma segura np navegador
      localStorage.setItem('token', dados.token);
      localStorage.setItem('userId', dados.userId);
      
      console.log('Login efetuado com sucesso via JWT!');
      
      //redirecionamento após login funcional
      navigate('/home');

    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.message || 'E-mail ou senha incorretos.');
      setErro(error.message);
    }
  };

  const handleForgotPassword = () => {
    console.log('Esqueci a senha');
  };

  const handleCreateAccount = () => {
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

        {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

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