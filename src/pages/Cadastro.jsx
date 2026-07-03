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
  const [erro, setErro] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');

    //validação extra de segurança pros campos obrigatórios
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      //faz a requisição para a rota de registo do backend
      const response = await fetch("http://localhost:3000/auth/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          email: email,
          senha: password 
        }),
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados.mensagem || 'Erro ao realizar o cadastro.');
      }

      alert('Conta criada com sucesso! Faça seu login.');
      
      //redirecionamento após o cadastro executado com sucesso
      navigate('/');

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(error.message || 'Erro ao conectar com o servidor.');
      setErro(error.message);
    }
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

        {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

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