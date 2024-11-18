import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import apiService from '../../services/api_service';
import logo from '../../assets/img/logo_e_fraude_branco.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      setIsSuccess(false);
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await apiService.login(email, password);
      if (response && response.access_token) {
        setIsSuccess(true);
        setMessage('Login bem-sucedido!');
        setTimeout(() => navigate('/inicio'), 1000);
      } else {
        setIsSuccess(false);
        setMessage('Erro ao fazer login.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Erro ao fazer login, email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img id="logo" src={logo} alt="Logo É Fraude?" />
      </div>
      <h1 className="title">LOGIN</h1>
      <label className="label" htmlFor="email">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        className="input-login"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="label" htmlFor="password">
        Senha
      </label>
      <input
        id="password"
        type="password"
        className="input-login"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message && (
        <div
          className={`alert ${isSuccess ? 'success' : 'error'}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </div>
      )}
      <button
        className="login-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'ENTRAR'}
      </button>
    </div>
  );
};

export default Login;
