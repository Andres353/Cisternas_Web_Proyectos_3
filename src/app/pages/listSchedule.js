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
