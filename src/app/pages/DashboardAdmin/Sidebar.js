import React from 'react';
import '../../components/admin/Sidebar.css';
import logo from '../../assets/cochaLogo.png'; // Importa la imagen desde assets
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth'; // Importa Firebase Auth

function Sidebar() {
  const auth = getAuth(); // Obtén la instancia de Firebase Auth
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cerrará tu sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut()
          .then(() => {
            Swal.fire('Cerraste sesión', 'Tu sesión ha sido cerrada exitosamente.', 'success');
            navigate('/Login'); // Redirigir a la página de inicio de sesión
          })
          .catch((error) => {
            Swal.fire('Error', 'Hubo un problema al cerrar la sesión. Intenta nuevamente.', 'error');
          });
      }
    });
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <nav>
        <ul>
          <li className="nav-item">
            <Link to="/AssigmentReport" className="nav-links">
              Reportes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/registroOTB" className="nav-links">
              Asignaciones
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/listSchedules" className="nav-links">
              Lista de Horarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Assigment" className="nav-links">
              Cisternas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Complaints" className="nav-links">
              Quejas y Reclamos
            </Link>
          </li>
          <li className="nav-item">
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
