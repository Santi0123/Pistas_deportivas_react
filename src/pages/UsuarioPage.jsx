import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsuarioList from "../components/UsuarioList"; // Asegúrate de que este archivo exista

const UsuarioPage = () => {
    return (
        <>
        <h3>Listado de usuarios</h3>
        <UsuarioList />
        <Button as={Link} to="/usuario/add">
            Añadir un nuevo usuario
        </Button>
        </>
    );
};

export default UsuarioPage;
