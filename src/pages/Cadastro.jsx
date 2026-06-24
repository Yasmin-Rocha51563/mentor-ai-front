import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import styles from './LoginPage.module.css'; 

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userName', name);
    alert('Conta criada com sucesso!');
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <Logo />
        </div>

        <h1 className={styles.heading}>
          Faça seu cadastro para utilizar a plataforma
        </h1>

        <form onSubmit={handleRegister} className={styles.form}>
          <InputField 
            id="name"
            label="Nome Completo:"
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <InputField 
            id="email"
            label="E-mail:"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField 
            id="password"
            label="Senha:"
            type="password"
            placeholder="Crie sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth>
            Cadastrar
          </Button>

          <div style={{ marginTop: '20px' }}>
            <Button 
              type="button" 
              variant="secondary" 
              fullWidth 
              onClick={() => navigate('/')}
            >
              Já tenho conta (Voltar)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
