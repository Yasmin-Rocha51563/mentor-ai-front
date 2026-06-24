import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../pages/HomePage.module.css';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <button onClick={() => navigate('/')} className={styles.exitButton}>
        Sair
      </button>
    </header>
  );
};

export default Header;
