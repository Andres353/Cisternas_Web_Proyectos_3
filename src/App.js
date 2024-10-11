import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './app/pages/registroOTB.js';
import Prueba from './app/pages/prueba.js';
import Show from './app/pages/listSchedule.js'; // Asegúrate de importar Show

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registroOTB" element={<UserRegistration />} />
        <Route path="/prueba" element={<Prueba />} />
        <Route path="/listSchedules" element={<Show />} /> {/* Cambia "Show" a "show" si tu ruta es en minúsculas */}
      </Routes>
    </Router>
  );
}

export default App;
