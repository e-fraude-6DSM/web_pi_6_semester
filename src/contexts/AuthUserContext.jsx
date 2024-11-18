import React, { createContext, useContext, useState } from 'react';
import apiService from '../services/api_service';

const AuthUserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(apiService.isAuthenticated());

  const login = async (email, password) => {
    await apiService.login(email, password);
    setIsAuthenticated(true);
    
  };

  const logout = () => {
    apiService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthUserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
