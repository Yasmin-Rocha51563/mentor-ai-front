import { useState } from 'react';
import styles from '../styles/Globals.module.css';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  id,
  required = false,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        autoComplete={autoComplete}
        className={`${styles.input} ${focused ? styles.inputFocused : ''}`}
      />
    </div>
  );
};

export default InputField;