import { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        const peticion = async () => {
        try {
            const response = await api.get('/admin/usuario');
            setUsuarios(response.data);
        } catch (err) {
            navigate('/login');
            console.log(err);
        }
        };
        peticion();
    }, []);

    // Manejar el cambio del select
    const handleSelectChange = (event) => {
        setUsuarioSeleccionado(event.target.value);
    };

    // Filtrar usuarios si se selecciona uno
    const usuariosFiltrados = usuarioSeleccionado
        ? usuarios.filter(usuario => usuario.id.toString() === usuarioSeleccionado)
        : usuarios;

    return (
        <Container>
        <h2>Lista de Usuarios</h2>

        <Form.Group controlId="usuarioSelect">
            <Form.Label>Filtrar por usuario</Form.Label>
            <Form.Control as="select" onChange={handleSelectChange} defaultValue="">
            <option value="">Mostrar todos los usuarios</option>
            {usuarios.map(usuario => (
                <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
            ))}
            </Form.Control>
        </Form.Group>

        <Table className="mt-3">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>
            </thead>
            <tbody>
            {usuariosFiltrados.map(usuario => (
                <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>
                    <Button as={Link} to={`/admin/usuario/edit/${usuario.id}`} className="btn-success">Editar</Button>
                </td>
                <td>
                    <Button as={Link} to={`/admin/usuario/del/${usuario.id}`} className="btn-danger">Eliminar</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    );
};

export default UsuarioList;
