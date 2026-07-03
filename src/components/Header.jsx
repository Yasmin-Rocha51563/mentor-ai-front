import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/HomePage.module.css';

const Header = () => {
  const navigate = useNavigate();

  // Função para fazer o logout real limpando as credenciais de segurança
  const handleLogout = () => {
    localStorage.clear(); // Apaga o Token JWT e o userId do navegador
    console.log('Sessão encerrada com sucesso!');
    navigate('/'); // Redireciona para a tela de login
  };

  return (
    <header className={styles.header}>
      <button onClick={handleLogout} className={styles.exitButton}>
        Sair
      </button>
    </header>
  );
};

export default Header;
