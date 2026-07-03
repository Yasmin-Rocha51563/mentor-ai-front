import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import styles from '../pages/HomePage.module.css'; 

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const obterClasseItem = (path) => {
    return location.pathname === path ? `${styles.active}` : '';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li 
            className={obterClasseItem('/') || obterClasseItem('/home')} 
            onClick={() => navigate('/home')}
            style={{ cursor: 'pointer' }}
          >
            Início
          </li>
          <li 
            className={obterClasseItem('/trilhas')} 
            onClick={() => navigate('/trilhas')}
            style={{ cursor: 'pointer' }}
          >
            Minhas trilhas
          </li>
          <li 
            className={obterClasseItem('/chat')} 
            onClick={() => navigate('/chat')}
            style={{ cursor: 'pointer' }}
          >
            Mentor IA
          </li>
          <li 
            className={obterClasseItem('/perfil')} 
            onClick={() => navigate('/perfil')}
            style={{ cursor: 'pointer' }}
          >
            Perfil
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;