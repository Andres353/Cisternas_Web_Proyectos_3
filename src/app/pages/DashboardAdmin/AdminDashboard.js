import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import KPIWidget from './KPIWidget';
import AssignmentCalendar from './AssignmentCalendar';
import '../../components/admin/Dashboard.css';
import { auth } from '../../Tools/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        
        {/* Header con buscador, iconos y botón de cerrar sesión */}
        <div className="header">
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
          </div>
          {/* <div className="icons">
            <span className="icon">🔔</span> 
            <span className="icon">⚙️</span> 
          </div> */}
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        {/* Panel de Control de Entregas y Cisternas */}
        <div className="kpi-section">
          <KPIWidget title="Cisternas Activas" value="20" />
          <KPIWidget title="OTBs Asignadas" value="15" />
          <KPIWidget title="Solicitudes Pendientes" value="5" />
          <KPIWidget title="Entregas en Proceso" value="8" />
          <KPIWidget title="Entregas Completadas" value="120" />
        </div>

        {/* Panel de Estado de Cisterneros */}
        <div className="cisterneros-status-section">
          <h3>Estado de Cisterneros</h3>
          <table className="cisterneros-status-table">
            <thead>
              <tr>
                <th>Cisternero</th>
                <th>Cisterna</th>
                <th>Estado</th>
                <th>Última Asignación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cisternero 1</td>
                <td>Cisterna 1</td>
                <td>En Proceso</td>
                <td>11/07/2024 - 18:00</td>
              </tr>
              <tr>
                <td>Cisternero 2</td>
                <td>Cisterna 2</td>
                <td>Disponible</td>
                <td>11/08/2024 - 10:00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calendario de Entregas Programadas */}
        <div className="calendar-section">
          <h3>Calendario de Entregas</h3>
          <AssignmentCalendar />
        </div>

        {/* Tabla de Actividad de Cisterneros */}
        <div className="activity-section">
          <h3>Actividad de Cisterneros</h3>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Cisternero</th>
                <th>OTB</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cisternero 1</td>
                <td>OTB San Lorenzo</td>
                <td>11/07/2024</td>
                <td>18:00</td>
                <td>Aceptado</td>
              </tr>
              <tr>
                <td>Cisternero 2</td>
                <td>OTB Alto Arrumani</td>
                <td>11/08/2024</td>
                <td>10:00</td>
                <td>En Proceso</td>
              </tr>
              {/* Añadir más filas según sea necesario */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
