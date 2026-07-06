import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/HomePage.module.css';

const Header = () => {
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.clear(); 

  console.log('Sessão encerrada com sucesso!');
  setTimeout(() => {
    navigate('/', { replace: true });
  }, 50);
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
