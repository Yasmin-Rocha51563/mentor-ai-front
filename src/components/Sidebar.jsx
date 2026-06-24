import React from 'react';
import Logo from './Logo.jsx';
import styles from '../pages/HomePage.module.css'; 

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.active}>Início</li>
          <li>Minhas trilhas</li>
          <li>Mentor IA</li>
          <li>Perfil</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
