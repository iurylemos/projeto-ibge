import { AxiosResponse } from "axios";
import React, { useState, useContext, ChangeEvent, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner, Toast } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsCheckCircle, BsXOctagon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ApiService } from "../../api/api.service";
import { AuthContext } from "../../context/user-provider";
import { checkCPF, checkDate, cpfMask, dateMask } from "../../utils/mask";

interface IErrors {
    message: string;
}

const Login: React.FC = () => {
    const apiService = new ApiService();
    const contextType = useContext(AuthContext);

    const [cpf, setCpf] = useState<string>("");
    const [dt_nascimento, setDtNascimento] = useState<string>("");
    const [validCPF, setValidCPF] = useState<boolean>(false);
    const [validDate, setValidDate] = useState<boolean>(false);
    const [errors, setErrors] = useState<IErrors[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
    }, [loading]);

    if (!didMount) {
        return null;
    }

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
        e.preventDefault();
        if (e.target.name === "cpf") {
            if (checkCPF(cpfMask(e.target.value))) {
                setValidCPF(true)
            } else {
                setValidCPF(false)
            }

            setCpf(cpfMask(e.target.value));
        } else if (e.target.name === "dt_nascimento") {
            if (checkDate(e.target.value) && dateMask(e.target.value).length === 10) {
                setValidDate(true);
            } else {
                setValidDate(false);
            }

            if (dateMask(e.target.value).length <= 10)
                setDtNascimento(dateMask(e.target.value));
        }
    }

    async function handleSubmit(): Promise<void> {
        try {
            setLoading(true);
            const resp: AxiosResponse = await apiService.login(cpf, dt_nascimento);
            const user = resp.data;
            console.log('USER', user)
            contextType?.setAuth({
                nome: user.nome,
                cpf: cpf,
                data_nascimento: dt_nascimento,
                vacinado: user.vacinado,
                municipio: user.municipio,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                getAuth: true
            });
            setLoading(false);
        } catch (error) {
            errors.push(error);
            setErrors([...errors]);
            setLoading(false);
        }
    }

    function validSubmit(): boolean {
        if ((!cpf && !dt_nascimento && !validCPF && !validDate)) {
            return false;
        }

        return true;
    }

    return (
        <Container style={{ marginTop: '2em' }}>
            <Row>
                <Col md={4} sm={2} xs={2}></Col>
                <Col md={4} sm={8} xs={8}>
                    <Form>
                        <IconContext.Provider value={{ color: "green", className: "d-flex justify-content-center align-items-center", size: "10em", style: { alignItems: 'center' } }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <BsCheckCircle />
                            </div>
                        </IconContext.Provider>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="mt-2">CPF</Form.Label>
                            <Form.Control required isValid={validCPF} isInvalid={(!validCPF && cpf.length) ? true : false} type="text" placeholder="Digite o seu CPF" name="cpf" value={cpf} onChange={onChange} />
                            {
                                !validCPF ? (
                                    <Form.Control.Feedback type="invalid">
                                        CPF inválido
                                    </Form.Control.Feedback>
                                ) : (<></>)
                            }
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="mt-2">Data de Nascimento</Form.Label>

                            <Form.Control required isValid={validDate} isInvalid={(!validDate && dt_nascimento.length) ? true : false} type="text" placeholder="__/__/__" className='form-control' name="dt_nascimento" value={dt_nascimento} onChange={onChange} />
                            {
                                !validDate ? (
                                    <Form.Control.Feedback type="invalid">
                                        Data inválida
                                    </Form.Control.Feedback>
                                ) : (<></>)
                            }
                        </Form.Group>

                        <Form.Group className="mt-4">
                            Ainda não tem cadastro?

                                <Link to="/registro">
                                <Button variant="success" size="sm" style={{ marginLeft: '2em' }}>
                                    Cadastrar
                                    </Button>
                            </Link>
                        </Form.Group>

                        <div style={{ textAlign: "center" }}>
                            <Button disabled={!validSubmit() ? true : false} style={{ width: "70%" }} className="mt-3" variant="dark" onClick={async () => { await handleSubmit(); }} size="lg" block={true}>
                                {
                                    loading ? (
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (<></>)
                                }
                        LOGIN
                    </Button>
                        </div>
                    </Form>

                    {
                        (errors && errors.length) ? errors.map((e) => (
                            <div
                                aria-live="polite"
                                aria-atomic="true"
                                style={{
                                    position: 'relative',
                                    minHeight: '100px',
                                }}
                                key={Math.random()}
                            >
                                <Toast
                                    style={{
                                        position: 'absolute',
                                        top: '1em',
                                        right: 0,
                                    }}
                                >
                                    <Toast.Header>
                                        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                                        <BsXOctagon className="rounded mr-2" />
                                        <strong className="mr-auto ml-2">Error</strong>
                                        <small>just now</small>
                                    </Toast.Header>
                                    <Toast.Body>Usuário invalido! Tente novamente</Toast.Body>
                                </Toast>
                            </div>
                        )) : (<></>)
                    }
                </Col>
                <Col md={4} sm={2} xs={2}></Col>
            </Row>
        </Container >
    );
};

export default Login;
