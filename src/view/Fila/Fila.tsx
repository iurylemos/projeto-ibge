import React, { useCallback, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import HeaderFila from '../../components/fila/HeaderFila/HeaderFila';
import ModalFila from '../../components/fila/ModalFila/ModalFila';
import { config } from '../../config';

interface Props {

}

interface Usuario {
    nome: string;
    data_nascimento: string;
    cpf: string;
    vacinado: boolean;
    municipio: string;
    createdAt: string;
    updatedAt: string;
}

const Fila: React.FC<Props> = () => {
    const [usuariosVacinados, setUsuariosVacinados] = useState<Usuario[]>([]);
    const [usuariosNaoVacinados, setUsuariosNaoVacinados] = useState<Usuario[]>([]);
    const [modal, setModal] = useState<boolean>(false);

    const fetchUsers = useCallback(async () => {
        fetch(`${config.API_URL}/usuario/todosUsuarios`)
            .then((res: Response) => res.json())
            .then((data) => {
                if (Array.isArray(data.usuarios)) {
                    const array = data.usuarios.sort(sortFunction);
                    const filter = array.filter((u: any) => !u.vacinado);
                    const filterVacinado = array.filter((u: any) => u.vacinado);
                    setUsuariosVacinados(filterVacinado);
                    setUsuariosNaoVacinados(filter);
                }
            })
    }, []);

    function statusModal() {
        setModal(!modal);
    }

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    function sortFunction(a: any, b: any) {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA > dateB ? 1 : -1;
    };

    return (
        <Container>
            <HeaderFila statusModal={statusModal} />
            <Row>
                <Col>
                    <Card bg='warning' text={"warning".toLowerCase() === 'light' ? 'dark' : 'white'}>
                        <Card.Header>USUÁRIOS NÃO VACINADOS</Card.Header>
                        <Table variant='warning' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th>CPF</th>
                                    <th>Municipio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuariosNaoVacinados.length ? usuariosNaoVacinados.map((usuario, idx) => (
                                        <tr key={idx + Math.random()}>
                                            <td>{idx + 1}</td>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.data_nascimento}</td>
                                            <td>{usuario.cpf}</td>
                                            <td>{usuario.municipio}</td>
                                        </tr>
                                    )) : (<></>)
                                }
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col>
                    <Card bg='success' text={"success".toLowerCase() === 'light' ? 'dark' : 'white'}>
                        <Card.Header>USUÁRIOS VACINADOS</Card.Header>
                        <Table variant='success' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th>CPF</th>
                                    <th>Municipio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuariosVacinados.length ? usuariosVacinados.map((usuario, idx) => (
                                        <tr key={idx + Math.random()}>
                                            <td>{idx + 1}</td>
                                            <td>{usuario.nome}</td>
                                            <td>{usuario.data_nascimento}</td>
                                            <td>{usuario.cpf}</td>
                                            <td>{usuario.municipio}</td>
                                        </tr>
                                    )) : (<></>)
                                }
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
            {
                modal ? (
                    <ModalFila show={modal} statusModal={statusModal} vacinados={usuariosVacinados} naoVacinados={usuariosNaoVacinados} />
                ) : (<></>)
            }
        </Container>
    )
}

export default Fila;