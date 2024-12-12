import React, { useState } from 'react';
<<<<<<< HEAD
import { auth, db } from '../Tools/firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';
import logo from '../assets/logoGrande.png';
=======
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import '../components/login.css'; // Archivo CSS personalizado para los estilos
import logo from '../assets/logoGrande.png'; // Ruta de tu logo
>>>>>>> 81e7b92582a1359c7bfc6326b1485e3f9c48aa16

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
<<<<<<< HEAD
    console.log('Iniciando proceso de autenticación');

    try {
      // Autenticar usuario con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);

      // Obtener el rol del usuario desde la colección "users" en Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Datos del usuario en Firestore:', userData);

        if (userData.role === 'Admin') {
          console.log('Redirigiendo a /dashboard');
          navigate('/AssigmentReport'); // Solo redirige al dashboard si es admin
        } else {
          console.log('Usuario sin rol, no redirige'); 
        }
      } else {
        setError('No se encontró la información del usuario.');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Correo o contraseña incorrectos.');
=======
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
>>>>>>> 81e7b92582a1359c7bfc6326b1485e3f9c48aa16
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Cisternas App</h2>
          <img src={logo} alt="Logo Cisternas" className="login-logo" />
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">Iniciar Sesión</button>
          </form>
        </div>
=======
    <div className="login-container">
      <div className="login-card">
        <h2>Cisternas App</h2>
        <img src={logo} alt="Logo Cisternas" className="login-logo" /> {/* Imagen del logo */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Nombre de Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
>>>>>>> 81e7b92582a1359c7bfc6326b1485e3f9c48aa16
      </div>
    </div>
  );
};

export default Login;
