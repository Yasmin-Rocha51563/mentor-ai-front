import { useState } from 'react';
import InputField from './InputField.jsx';
import Button from './Button.jsx';
import styles from '../styles/Globals.module.css';

const LoginForm = ({ onLogin, onForgotPassword, onCreateAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin?.({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <InputField
        id="email"
        label="E-mail:"
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      <button
        type="button"
        className={styles.forgotLink}
        onClick={onForgotPassword}
      >
        Esqueci a senha
      </button>

     
      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>

      <Button 
        type="button" 
        variant="secondary" 
        fullWidth 
        onClick={onCreateAccount}
      >
        Criar conta
      </Button>
    </form>
  );
};

export default LoginForm;