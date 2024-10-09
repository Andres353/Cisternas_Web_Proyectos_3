import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './app/components/Login.jsx';
import SignUp from './app/components/SignUp.jsx';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<h1>Inicio de sesión exitoso</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
