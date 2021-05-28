import React, { useState, useContext, ChangeEvent } from "react";
import { Button, Col, Container, Form, Row, Spinner, Toast } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsCheckCircle, BsXOctagon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ApiService } from "../../api/api.service";
import { AuthContext } from "../../context/user-provider";
import { checkCPF, checkDate, cpfMask, dateMask } from "../../utils/mask";

interface Props {
    // setAuth: Function;
}

const Login: React.FC<Props> = () => {
    const apiService = new ApiService();
    const contextType = useContext(AuthContext);

    const [cpf, setCpf] = useState("");
    const [dt_nascimento, setDtNascimento] = useState("");
    const [validCPF, setValidCPF] = useState(false);
    const [validDate, setValidDate] = useState(false);
    const [errors, setErrors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        if (e.currentTarget.name === "cpf") {
            if (checkCPF(cpfMask(e.currentTarget.value))) {
                setValidCPF(true)
            } else {
                setValidCPF(false)
            }

            setCpf(cpfMask(e.currentTarget.value));
        } else if (e.currentTarget.name === "dt_nascimento") {
            if (checkDate(e.currentTarget.value) && dateMask(e.currentTarget.value).length === 10) {
                setValidDate(true);
            } else {
                setValidDate(false);
            }

            if (dateMask(e.currentTarget.value).length <= 10)
                setDtNascimento(e.currentTarget.value);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setLoading(true);
        apiService.login(cpf, dt_nascimento).then((user: any) => {

            contextType?.setAuth({
                nome: user["user"].nome,
                cpf: cpf,
                dt_nascimento: dt_nascimento,
                municipio: user["user"].municipio,
                createdAt: user["user"].createdAt,
                updatedAt: user["user"].updatedAt,
                getAuth: true
            });
            setLoading(false);
        }).catch((e: any) => {
            errors.push(e);
            setErrors([...errors])
        });
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
                            <div style={{ maxWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                                <BsCheckCircle />
                            </div>
                        </IconContext.Provider>

                        <Form.Group controlId="formBasicPassword" style={{ maxWidth: '300px' }}>
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

                        <Form.Group controlId="formBasicEmail" style={{ maxWidth: '300px' }}>
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

                        <div style={{ maxWidth: "300px", textAlign: "center" }}>
                            <Button disabled={!validSubmit() ? true : false} style={{ width: "70%" }} className="mt-3" variant="dark" onClick={handleSubmit} size="lg" block={true}>
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
                        errors.length ? errors.map((e) => (
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
        </Container>
    );
};

export default Login;
