import React, { useContext } from 'react';
import { AuthContext } from '../../context/user-provider';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BsCheckCircle, BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

interface Props {

}

const Header: React.FC<Props> = () => {
    const value = useContext(AuthContext);
    const usuario = value?.auth;

    function logout() {
        value?.setAuth({
            nome: "",
            cpf: "",
            data_nascimento: "",
            vacinado: false,
            municipio: "",
            createdAt: "",
            updatedAt: "",
            getAuth: false,
        });
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <BsCheckCircle />
            Fila de vacinação
        </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to=''>Home</Nav.Link>
                <Nav.Link as={Link} to='/fila'>Fila</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end p-2" style={{ color: 'white' }}>
                <BsFillPersonFill fontSize='1.5em' color='white' style={{ marginRight: '0.2em' }} />
                {
                    usuario?.nome
                }
                <Button variant="outline-success" style={{ marginLeft: '0.5em' }} onClick={() => logout()}>Sair</Button>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;