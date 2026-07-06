import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Trilhas from '../pages/Trilhas';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Chat from '../Chat.jsx';

// COMPONENTE DE GUARDA (ROTA PROTEGIDA)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // o navigate redireciona automaticamentee o replace limpa o histoico da seta do navegador
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* rotas publicas*/}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />

        {/* rotas protegidas (so acessa se tiver o token salvo no localStorage) */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trilhas" 
          element={
            <ProtectedRoute>
              <Trilhas />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;