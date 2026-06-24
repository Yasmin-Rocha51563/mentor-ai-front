import styles from '../styles/Globals.module.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};

export default Button;
