import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, ListGroup, Modal, Row, Tab } from 'react-bootstrap';
import { AuthContext } from '../../../context/user-provider';
import { checkCPF, cpfMask } from '../../../utils/mask';

interface Props {
    show: boolean;
    vacinados: any[];
    naoVacinados: any[];
    statusModal: () => void;
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

const ModalFila: React.FC<Props> = (props: Props) => {
    const value = useContext(AuthContext);
    const userContext = value?.auth;

    const [show, setShow] = useState<boolean>(false);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [posicaoUser, setPosicaoUser] = useState<number>(0);
    const [searchCpf, setSearchCpf] = useState<string>("");
    const [userCpf, setUserCpf] = useState<Usuario | null>(null);
    const [posicaoUserCpf, setPosicaoUserCpf] = useState<number>(0);
    const [cpfValid, setCpfValid] = useState(false);

    useEffect(() => {
        const { vacinados, naoVacinados } = props;

        if (Object.values(vacinados).length || Object.values(naoVacinados).length) {
            const filter = vacinados.filter(u => u.cpf === userContext?.cpf);

            if (filter.length) {
                setUsuario(filter.shift())
            } else {
                const index = naoVacinados.findIndex(u => u.cpf === userContext?.cpf);
                const filtering = naoVacinados.filter(u => u.cpf === userContext?.cpf);
                setUsuario(filtering.shift());
                setPosicaoUser(index)
            }
        }

        if (props.show !== show) {
            setShow(props.show);
        }
    }, [userContext?.cpf, props, show]);

    const onChange = (e: any) => {
        if (checkCPF(cpfMask(e.target.value))) {
            setCpfValid(true);
        } else {
            setCpfValid(false);
        }

        setSearchCpf(cpfMask(e.target.value));
    }

    function procurarUsuario() {
        // const { search_cpf } = this.state;
        const { vacinados, naoVacinados } = props;

        if (Object.values(vacinados).length || Object.values(naoVacinados).length) {
            const filter = vacinados.filter(u => u.cpf === searchCpf);
            if (filter.length) {
                setUserCpf(filter.shift());
            } else {
                const index = naoVacinados.findIndex(u => u.cpf === searchCpf);
                const filtering = naoVacinados.filter(u => u.cpf === searchCpf);
                setUserCpf(filtering.shift());
                setPosicaoUserCpf(index);
            }
        }
    }

    function handleClose() {
        setShow(false);
        props.statusModal();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Pesquisa por usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                    Meu usuário
                                    </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    Pesquisar por outro usuário
                                    </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    {
                                        usuario ? (
                                            <ListGroup>
                                                <ListGroup.Item>Nome: {usuario.nome}</ListGroup.Item>
                                                <ListGroup.Item>Data de nascimento: {usuario.data_nascimento}</ListGroup.Item>
                                                <ListGroup.Item>CPF: {usuario.cpf}</ListGroup.Item>
                                                <ListGroup.Item variant={usuario.vacinado ? 'success' : 'danger'}>Vacinado: {usuario.vacinado ? "Sim" : "Não"}</ListGroup.Item>
                                                {
                                                    !usuario.vacinado ? (
                                                        <ListGroup.Item>Posição na fila: {posicaoUser + 1}</ListGroup.Item>
                                                    ) : (<></>)
                                                }
                                            </ListGroup>
                                        ) : (<></>)
                                    }
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    <Form inline style={{ display: 'inline-flex' }}>
                                        <FormControl required isInvalid={!cpfValid} value={searchCpf} name="search_cpf" type="text" placeholder="Digite o cpf.." className="mr-sm-2" onChange={onChange} />
                                        {
                                            cpfValid ? (
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a username.
                                                </Form.Control.Feedback>
                                            ) : (<></>)
                                        }
                                        <Button disabled={!cpfValid} variant="outline-info" onClick={() => procurarUsuario()}>Search</Button>
                                    </Form>
                                    {
                                        userCpf ? (
                                            <ListGroup style={{ marginTop: '1em' }}>
                                                <ListGroup.Item>Nome: {userCpf.nome}</ListGroup.Item>
                                                <ListGroup.Item>Data de nascimento: {userCpf.data_nascimento}</ListGroup.Item>
                                                <ListGroup.Item>CPF: {userCpf.cpf}</ListGroup.Item>
                                                <ListGroup.Item variant={userCpf.vacinado ? 'success' : 'danger'}>Vacinado: {userCpf.vacinado ? "Sim" : "Não"}</ListGroup.Item>
                                                {
                                                    !userCpf.vacinado ? (
                                                        <ListGroup.Item>Posição na fila: {posicaoUserCpf + 1}</ListGroup.Item>
                                                    ) : (<></>)
                                                }
                                            </ListGroup>
                                        ) : (<></>)
                                    }
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFila;