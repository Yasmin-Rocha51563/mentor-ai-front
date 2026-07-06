import React from 'react';
import styles from './ButtonWithIcon.module.css';

const ButtonWithIcon = ({
  children,
  icon,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  fullWidth = false,
  style,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={[
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span>{children}</span>
      {icon && <span className={styles.iconContainer}>{icon}</span>}
    </button>
  );
};

export default ButtonWithIcon;
