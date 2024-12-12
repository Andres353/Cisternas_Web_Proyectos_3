import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Tools/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom'; // Para obtener el ID de la URL
import Swal from 'sweetalert2';
import '../components/updateSchedules.css';

const UpdateSchedule = () => {
    const [nombre, setNombre] = useState(""); 
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID desde los parámetros de la URL

    useEffect(() => {
        const getScheduleById = async () => {
            const scheduleDoc = await getDoc(doc(db, "Schedule", id));
            if (scheduleDoc.exists()) {
                const data = scheduleDoc.data();
                setNombre(data.nameotb || "");
                setFecha(data.date || "");
                setHora(data.hour || "");
                setHoraFin(data.horaFin || "");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "El registro no existe",
                    icon: "error",
                });
                navigate('/listSchedules'); // Redirigir si el registro no existe
            }
        };

        getScheduleById();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (hora >= horaFin) {
            Swal.fire({
                title: "Error",
                text: "La hora de llegada no puede ser posterior o igual a la hora de salida.",
                icon: "error",
            });
            return;
        }

        try {
            await updateDoc(doc(db, "Schedule", id), {
                nameotb: nombre,
                date: fecha,
                hour: hora,
                horaFin: horaFin,
            });

            Swal.fire({
                title: "Éxito",
                text: "Registro actualizado correctamente",
                icon: "success",
            });

            navigate('/listSchedules'); // Redirigir después de actualizar
        } catch (error) {
            console.error("Error al actualizar el registro: ", error);
            Swal.fire({
                title: "Error",
                text: "Error al actualizar el registro",
                icon: "error",
            });
        }
    };

    const handleCancel = () => {
        navigate('/listSchedules'); // Cancelar y volver a la lista
    };

    return (
        <div className="update-schedule-wrapper">
            <div className="update-schedule-container">
                <form onSubmit={handleUpdate}>
                    <h2 className="mb-4">Actualizar Registro de OTB</h2>
                    <div className="form-group mb-3">
                        <label htmlFor="nombre">Nombre OTB</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="fecha">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="hora">Hora de Llegada</label>
                        <input
                            type="time"
                            className="form-control"
                            id="hora"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="horaFin">Hora de Salida</label>
                        <input
                            type="time"
                            className="form-control"
                            id="horaFin"
                            value={horaFin}
                            onChange={(e) => setHoraFin(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
                    <button type="button" className="btn btn-secondary ms-3" onClick={handleCancel}>Cancelar</button>
                </form>
            </div>
        </div>
    );
        
};

export default UpdateSchedule;
