<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Tools/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../components/listSchedules.css';
import Sidebar from '../pages/DashboardAdmin/Sidebar'; // Asegúrate de que la ruta sea correcta

const Show = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const scheduleCollection = collection(db, "Schedule");

  const getSchedule = async () => {
    const scheduleData = await getDocs(scheduleCollection);
    const combinedData = scheduleData.docs.map((doc) => {
      const data = doc.data();
      
      let formattedDate;
      if (data.date instanceof Date) {
        formattedDate = data.date;
      } else if (data.date?.toDate) {
        formattedDate = data.date.toDate();
      } else {
        formattedDate = new Date();
      }
  
      const hour = data.hour || 'N/A';
      const horaFin = data.horaFin || 'N/A';
  
      const isValidTimeRange = hour !== 'N/A' && horaFin !== 'N/A' && new Date(`1970-01-01T${horaFin}`) >= new Date(`1970-01-01T${hour}`);
  
      return {
        id: doc.id,
        name: data.nameotb || 'N/A',
        date: formattedDate,
        hour: hour,
        horaFin: isValidTimeRange ? horaFin : 'Error en hora fin',
      };
    });
  
    combinedData.sort((a, b) => a.date - b.date);
    setProducts(combinedData);
  };
  
  useEffect(() => {
    getSchedule();
  }, []);

  const handleDelete = async (id) => {
    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    // Si el usuario confirma, proceder con la eliminación
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "Schedule", id));
        setProducts(products.filter(product => product.id !== id));
        Swal.fire(
          'Eliminado',
          'El registro ha sido eliminado exitosamente.',
          'success'
        );
      } catch (error) {
        console.error("Error al eliminar el registro: ", error);
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el registro.',
          'error'
        );
      }
    }
  };

  const handleBack = () => {
    navigate('/registroOTB');
  };

  return (
    <div className="list-schedules-container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-md-9" style={{ marginTop: '70px' }}>
          <h2>Lista de OTB's</h2>
          
          <button onClick={handleBack} className="btn btn-secondary">Agregar OTB</button>
          <div className="table-wrapper" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nombre OTB</th>
                  <th>Fecha</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.date.toLocaleDateString("es-BO")}</td>
                    <td>{product.hour}</td>
                    <td>{product.horaFin}</td>
                    <td>
                      <button onClick={() => navigate(`/UpdateSchedule/${product.id}`)} className="btn btn-primary btn-sm">Actualizar</button>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
=======
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Tools/firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../components/listSchedules.css';

const Show = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Inicializar useNavigate
    const scheduleCollection = collection(db, "Schedule");

    const getSchedule = async () => {
        const scheduleData = await getDocs(scheduleCollection);
        const combinedData = scheduleData.docs.map((doc) => ({
            id: doc.id,
            hour: doc.data().hour,
            day: doc.data().day,
            name: doc.data().name || 'N/A',
        }));
        setProducts(combinedData);
    };

    useEffect(() => {
        getSchedule();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Schedule", id));
        setProducts(products.filter(product => product.id !== id));
    };

    const handleUpdate = (id) => {
        console.log(`Update item with ID: ${id}`);
    };

    // Función para volver a registroOTB
    const handleBack = () => {
        navigate('/registroOTB'); // Cambiar la ruta según tu configuración
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <h2 className='mt-2 mb-2'>Calendario Cisternero</h2>
                            <button onClick={handleBack} className="btn btn-secondary">Volver</button>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Día</th>
                                    <th>Hora</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.day}</td>
                                        <td>{product.hour}</td>
                                        <td>
                                            <button onClick={() => handleUpdate(product.id)} className="btn btn-update btn-sm">Actualizar</button>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-delete btn-sm">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Show;
>>>>>>> 81e7b92582a1359c7bfc6326b1485e3f9c48aa16
