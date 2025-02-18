import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CrearReserva = () => {
    const [instalaciones, setInstalaciones] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    // Obtener las instalaciones disponibles al cargar el componente
    useEffect(() => {
        const fetchInstalaciones = async () => {
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                console.log("Error al obtener instalaciones:", err);
            }
        };
        fetchInstalaciones();
    }, []);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await api.get('/usuario');
                setUsuario(response.data);
            } catch (err) {
                console.log("Error al obtener usuario:", err);
            }
        };
        fetchUsuario();
    }, []);

    // Obtener los horarios disponibles de la instalación seleccionada
    useEffect(() => {
        const fetchHorarios = async () => {
            if (!instalacionSeleccionada || !fecha) return;
            
            try {
                const response = await api.get(`/mis-reservas/horario/instalacion/${instalacionSeleccionada}/fecha/${fecha}`);
                setHorarios(response.data);
            } catch (err) {
                console.log("Error al obtener horarios:", err);
            }
        };
        fetchHorarios();
    }, [instalacionSeleccionada, fecha]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        const horarioSeleccionado = horarios.find(horario => horario.horaInicio === horaInicio);

        if (!instalacionSeleccionada || !horaInicio) {
            setMensaje('Debe seleccionar una instalación y hora válidas');
            setLoading(false);
            return;
        }

        const nuevaReserva = {
            usuario: { id: usuario.id },
            horario: horarioSeleccionado,
            fecha
        };
        
        try {
            await api.post('/mis-reservas', nuevaReserva);
            setLoading(false);
            setMensaje('Reserva creada con éxito');
            navigate('/mis-reservas');
        } catch (err) {
            setLoading(false);
            setMensaje('Error al crear la reserva. Intenta de nuevo.');
            console.error("Error al crear la reserva:", err);
        }
    };

    // Fecha de hoy
    const fechaHoy = new Date();
    const fechaHoyStr = fechaHoy.toISOString().split('T')[0];

    // Fecha máxima (7 días más adelante)
    const fechaMaxima = new Date();
    fechaMaxima.setDate(fechaHoy.getDate() + 7);
    const fechaMaximaStr = fechaMaxima.toISOString().split('T')[0];

    return (
        <Container>
            <h2>Crear Nueva Reserva</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="instalacionSeleccionada">
                    <Form.Label>Instalación</Form.Label>
                    <Form.Control
                        as="select"
                        value={instalacionSeleccionada}
                        onChange={(e) => setInstalacionSeleccionada(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una instalación</option>
                        {instalaciones.map((instalacion) => (
                            <option key={instalacion.id} value={instalacion.id}>
                                {instalacion.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        min={fechaHoyStr} // Bloquear fechas pasadas
                        max={fechaMaximaStr} // Bloquear fechas a más de 7 días
                        required
                    />
                </Form.Group>

                <Form.Group controlId="horaInicio">
                    <Form.Label>Hora de inicio</Form.Label>
                    <Form.Control
                        as="select"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una hora</option>
                        {horarios.map((horario) => (
                            <option key={horario.id} value={horario.horaInicio}>
                                {horario.horaInicio}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Crear Reserva'}
                </Button>
            </Form>

            {mensaje && <p>{mensaje}</p>}
        </Container>
    );
};

export default CrearReserva;
