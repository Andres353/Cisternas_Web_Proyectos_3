import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Para crear y obtener documentos en Firestore
import Swal from 'sweetalert2'; // Para alertas
import app from '../Tools/firebaseConfig.js'; // Importar la configuración de Firebase
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import '../components/RegistroOTB.css'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección

const UserRegistration = () => {
  const [nombre, setNombre] = useState("");
  const [diaSemana, setDiaSemana] = useState(""); // Para almacenar el día de la semana seleccionado
  const [hora, setHora] = useState(""); // Para almacenar la hora seleccionada
  const [schedules, setSchedules] = useState([]); // Para almacenar los datos de Schedule
  const db = getFirestore(app); // Inicializar Firestore
  const navigate = useNavigate(); // Inicializar useNavigate

  const fetchSchedules = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Schedule"));
      const fetchedSchedules = [];
      querySnapshot.forEach((doc) => {
        fetchedSchedules.push(doc.data());
      });
      setSchedules(fetchedSchedules);
    } catch (error) {
      console.error("Error al obtener los horarios: ", error);
    }
  };

  

  useEffect(() => {
    fetchSchedules(); // Cargar horarios al iniciar el componente
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    try {
      const currentDate = new Date();
      const bolivianTime = currentDate.toLocaleString("en-US", {
        timeZone: "America/La_Paz",
      });

      const otbDocRef = await addDoc(collection(db, "Otb"), {
        creationDate: bolivianTime,
      });

      const otbID = otbDocRef.id;

      await addDoc(collection(db, "Schedule"), {
        day: diaSemana,
        hour: hora,
        otbID: otbID,
        name: nombre,
      });

      Swal.fire({
        title: "Éxito",
        text: "OTB y horario registrados correctamente",
        icon: "success",
      });

      setNombre("");
      setDiaSemana("");
      setHora("");
    } catch (error) {
      console.error("Error al registrar la OTB: ", error);
      Swal.fire({
        title: "Error",
        text: "Error al registrar la OTB",
        icon: "error",
      });
    }
  };

  // Función para redirigir a la lista de OTBs
  // Función para redirigir a Show.js
  
  const goToList = () => {
    navigate('/listSchedules'); // Asegúrate de que la ruta sea correcta y no tenga la extensión '.js'
  };
  


  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="title">Registro de OTB</h1>

          <div className="inp">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className="input"
              placeholder="Nombre de la OTB"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <i className="fa-solid fa-user"></i>
          </div>

          <div className="inp">
            <select
              name="diaSemana"
              id="diaSemana"
              className="input"
              value={diaSemana}
              onChange={(e) => setDiaSemana(e.target.value)}
              required
            >
              <option value="">Seleccione un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
            <i className="fa-solid fa-calendar"></i>
          </div>

          <div className="inp">
            <input
              type="time"
              name="hora"
              id="hora"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
            <i className="fa-solid fa-clock"></i>
          </div>

          <button className="submit" type="submit">
            Registrar OTB
          </button>
        </form>

        {/* Botón para ir a la lista de OTBs */}
        <button className="btn btn-primary mt-3" onClick={goToList}>
          Ver lista de OTBs
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;
