import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Tools/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'; // Archivo CSS personalizado para los estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Cisternas App</h2>
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
      </div>
    </div>
  );
};

export default Login;


//bigoteeee