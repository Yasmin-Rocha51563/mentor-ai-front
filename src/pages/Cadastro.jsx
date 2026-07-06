import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import ButtonWithIcon from '../components/ButtonWithIcon.jsx';
import { Check, X } from 'lucide-react';
import styles from './LoginPage.module.css'; 

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erro, setErro] = useState('');

  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const showStatus = confirmPassword.length > 0;
  const isFormValid = name.trim() !== '' && email.trim() !== '' && passwordsMatch;

const handleRegister = async (e) => {
  e.preventDefault();
  setErro('');

  // validação extra de segurança pros campos obrigatórios
if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
  setErro('Por favor, preencha todos os campos.');
  return; 
}

if (password !== confirmPassword) {
  setErro('As senhas não coincidem.');
  return;
}

  try {
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

    if (!response.ok) {
      let mensagemErro = 'Erro ao realizar o cadastro.';
      try {
        const dadosErro = await response.json();
        console.log("Saída JSON (Erro):", JSON.stringify(dadosErro, null, 2));
        mensagemErro = dadosErro.mensagem || mensagemErro;
      } catch (e) {
      console.error("Servidor não retornou JSON no erro.");
      }
      throw new Error(mensagemErro);
    }

    const dados = await response.json();

    alert('Conta criada com sucesso! Faça seu login.');
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

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <InputField 
                id="confirmPassword"
                label="Confirmação de senha:"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {showStatus && (
              <div style={{ 
                paddingBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '24px'
              }}>
                {passwordsMatch ? (
                  <Check color="#28a745" size={24} strokeWidth={3} />
                ) : (
                  <X color="#dc3545" size={24} strokeWidth={3} />
                )}
              </div>
            )}
          </div>

       <ButtonWithIcon 
       type="submit" 
        variant="primary" 
      disabled={!passwordsMatch}
      icon={<Check size={20} />}
>
      Cadastrar
      </ButtonWithIcon>

      <div style={{ marginTop: '20px' }}>
        <Button 
          type="button" 
          variant="secondary" 
          fullWidth 
           onClick={() => navigate('/')}
            >
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;