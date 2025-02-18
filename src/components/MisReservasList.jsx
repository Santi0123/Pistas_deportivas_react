import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";
import MisReservasBorrar from "./MisReservasBorrar";

const MisReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await api.get('/mis-reservas');
                setReservas(response.data);
            } catch (err) {
                console.log("Error al obtener reservas:", err);
            }
        };
        fetchReservas();
    }, []);

    const eliminarReservaDelEstado = (id) => {
        setReservas(reservas.filter((reserva) => reserva.id !== id));
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>  
                        <th>Instalación</th> 
                        <th>Hora reserva</th>
                        <th>Fecha reserva</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.horario.instalacion.nombre}</td>
                            <td>{reserva.horario.horaInicio}</td>
                            <td>{reserva.fecha}</td>
                            <td>
                                <Button onClick={() => setReservaSeleccionada(reserva)} className="btn-danger">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <MisReservasBorrar
                reserva={reservaSeleccionada}
                onClose={() => setReservaSeleccionada(null)}
                onDelete={eliminarReservaDelEstado}
            />
        </Container>
    );
};

export default MisReservasList;
