import { Button, Modal } from "react-bootstrap";
import api from "../services/api";

const MisReservasBorrar = ({ reserva, onClose, onDelete }) => {
    if (!reserva) return null;

    const handleDelete = async () => {
        try {
            await api.delete(`/mis-reservas/${reserva.id}`);
            onDelete(reserva.id); // Elimina la reserva del estado en el componente padre
            onClose(); // Cierra el modal
        } catch (err) {
            console.log("Error al eliminar reserva:", err);
        }
    };

    return (
        <Modal show={!!reserva} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>ID:</strong> {reserva.id}</p>
                <p><strong>Instalación:</strong> {reserva.horario.instalacion.nombre}</p>
                <p><strong>Hora:</strong> {reserva.horario.horaInicio}</p>
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p>¿Estás seguro de que deseas eliminar esta reserva?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Confirmar eliminación
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MisReservasBorrar;
