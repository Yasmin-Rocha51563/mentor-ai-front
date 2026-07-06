import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import styles from './HomePage.module.css';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    const handlePageShow = (event) => {
      if (event.persisted) {
        const tokenAtualizado = localStorage.getItem('token');
        if (!tokenAtualizado) {
          window.location.replace('/');
        }
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [navigate]);
  return (
    <div className={styles.container}>
  
      <Sidebar />

      <main className={styles.mainContent}>
    
        <Header />

        <div className={styles.dashboard}>
       
          <Card title="O que estudar hoje">
            <div className={styles.lesson}>
              <div>
                <strong>Aula: Introdução ao HTML</strong>
                <p>Duração: 15 min</p>
              </div>
              <Button variant="primary" style={{ width: 'auto', padding: '10px 20px' }}>
                Assistir Aula
              </Button>
            </div>

            <div className={styles.lesson}>
              <div>
                <strong>Aula: Tags HTML</strong>
                <p>Duração: 25 min</p>
              </div>
              <Button variant="primary" style={{ width: 'auto', padding: '10px 20px' }}>
                Assistir Aula
              </Button>
            </div>
          </Card>

          <Card title="Mentoria IA" isSideCard>
            <p>Precisa de ajuda?</p>
           <Button variant="secondary" onClick={() => navigate('/chat')}>
    Falar com a mentoria IA</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;

