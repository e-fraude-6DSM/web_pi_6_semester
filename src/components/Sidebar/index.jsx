import React from 'react';
import './Sidebar.css';
import logo from '../../assets/img/logo_e_fraude_branco.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthUserContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sidebar">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <img id='logo' src={logo} alt="Logo eFraude" />
      <nav>
        <ul>
          <li><a href="/inicio">Início</a></li>
          <li><a href="/analise">Análise de
          transação</a></li>
          <li><a href="/cadastro">Cadastro de 
          transação</a></li>
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;
