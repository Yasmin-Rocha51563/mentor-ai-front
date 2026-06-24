import styles from '../styles/Globals.module.css';
import logoSrc from '../assets/Logo.png';

const Logo = () => {
  return <img src={logoSrc} alt="Mentor IA+" className={styles.logoImage} />;
};

export default Logo;
