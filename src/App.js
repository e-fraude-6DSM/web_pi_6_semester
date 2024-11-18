import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Analise from './pages/AnaliseDeTransacao';
import Cadastro from './pages/CadastroDeTransacao';
import Sidebar from './components/Sidebar';
import Detalhe from './pages/DetalhesDeTransacao';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthUserContext';

const ProtectedLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/detalhe/:id" element={<Detalhe />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
