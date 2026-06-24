import React from 'react';
import Button from './Button.jsx';
import styles from '../pages/HomePage.module.css';

const Card = ({ title, children, isSideCard }) => {
  return (
    <section className={isSideCard ? styles.cardSide : styles.card}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Card;
