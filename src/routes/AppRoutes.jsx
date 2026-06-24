import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trilhas from '../pages/trilhas.jsx';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Chat from '../Chat.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/trilhas" element={<Trilhas />}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
