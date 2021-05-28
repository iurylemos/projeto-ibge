import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { Form, Button, Container, InputGroup, DropdownButton, FormControl, Dropdown, Row, Col, Carousel, Spinner, Toast } from 'react-bootstrap';
import { ApiService } from '../../api/api.service';
import { AuthContext } from '../../context/user-provider';
import { checkCPF, checkDate, cpfMask, dateMask } from '../../utils/mask';
import slide1 from '../../assets/register/slide1.jpg';
import slide2 from '../../assets/register/slide2.jpg';
import slide3 from '../../assets/register/slide3.jpg';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { BsXOctagon } from 'react-icons/bs';

interface IErrors {
    message: string;
}

const Register: React.FC = () => {
    const apiService = new ApiService();
    const contextType = useContext(AuthContext);
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dt_nascimento, setDtNascimento] = useState<string>("");
    const [municipio, setMunicipio] = useState("");
    const [municipios, setMunicipios] = useState<any[]>([]);
    const [estado, setEstado] = useState({ nome: "" });
    const [estados, setEstados] = useState<any[]>([]);
    const [validCPF, setValidCPF] = useState<boolean>(false);
    const [validDate, setValidDate] = useState<boolean>(false);
    const [errors, setErrors] = useState<IErrors[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [didMount, setDidMount] = useState(false);

    const fetchStates = useCallback(async () => {
        fetch(`${config.API_URL}/estados`)
            .then((res: Response) => res.json())
            .then((data) => {
                setEstados(data["estados"]);
            })
    }, [])

    useEffect(() => {
        setDidMount(true);
        fetchStates();
        return () => setDidMount(false);
    }, [fetchStates]);

    if (!didMount) {
        return null;
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
            await apiService.register(nome, cpf, dt_nascimento, municipio);
            contextType?.setAuth({
                nome: nome,
                cpf: cpf,
                data_nascimento: dt_nascimento,
                vacinado: false,
                municipio: municipio,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                getAuth: true
            });
            setLoading(false);
        } catch (error) {
            errors.push(error);
            setErrors([...errors]);
            setLoading(false);
        }
    }

    const validSubmit = (): boolean => {
        if ((!nome || !cpf || !dt_nascimento || !municipio) || (!validCPF && !validDate)) {
            return false;
        }

        return true;
    }

    const searchMunicipio = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();

        const filter = municipios.filter((u) => u.nome === e.currentTarget.value);

        if (filter.length === 1) {
            setMunicipio(filter.shift()["id"]);
        } else {
            setMunicipio("");
        }
    }

    const loadMunicipios = async (id_estado: string): Promise<void> => {
        const resp = await apiService.getCountyForState(id_estado);
        setMunicipios(resp.data["municipios"]);
    }

    const selectState = async (estado: any): Promise<void> => {
        if (Object.entries(estado).length) {
            await loadMunicipios(estado["id"])
        }

        setEstado(estado);
    }

    return (
        <Container style={{ marginTop: '5em' }}>
            <Row>
                <Col xs={12} md={12} sm={12} lg={7} xl={6}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={slide1}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{ color: 'red', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Participe da campanha de vacinação</h3>
                                <p style={{ color: 'red', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Sua vida é importante!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={slide2}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{ color: 'red', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Faça o seu cadastro</h3>
                                <p style={{ color: 'red', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Cuidar da sua saúde é essêncial</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={slide3}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{ color: 'green', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Campanha de vacinação</h3>
                                <p style={{ color: 'red', textShadow: "2px 2px 4px #000000", fontWeight: 'bold' }}>Faça agora o seu cadastro</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col xs={12} md={12} sm={12} lg={5} xl={{ offset: 2 }}>
                    <Form>
                        <Form.Group controlId="formBasicFirstName">
                            <Form.Label className="mt-2">Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o seu nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicLastName">
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
                            <Form.Label className="mt-2">Data de nascimento</Form.Label>
                            <Form.Control required isValid={validDate} isInvalid={(!validDate && dt_nascimento.length) ? true : false} type="text" placeholder="__/__/__" className='form-control' name="dt_nascimento" value={dt_nascimento} onChange={onChange} />
                            {
                                !validDate ? (
                                    <Form.Control.Feedback type="invalid">
                                        Data inválida
                                    </Form.Control.Feedback>
                                ) : (<></>)
                            }
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Estados</Form.Label>
                            <InputGroup className="mb-3">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title="Estados"
                                    id="input-group-dropdown-1"
                                    name="estado"
                                >
                                    {
                                        estados.length ? estados.map((mun: any, i: number) => (
                                            <Dropdown.Item onClick={() => selectState(mun)} value={mun.nome} key={i + Math.random() + i.toString()} href="#">{mun.nome}</Dropdown.Item>
                                        )) : (<></>)
                                    }
                                </DropdownButton>
                                <FormControl aria-describedby="basic-addon1" defaultValue={estado.nome} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Municipio</Form.Label>
                            <input className='form-control' disabled={!estado.nome || !municipios.length} placeholder='Digite o nome do municipio..' size={50} list="municipios" onChange={searchMunicipio} multiple />
                            <datalist id="municipios">
                                {
                                    municipios.length ? municipios.map((mun, i) => (
                                        <option key={i + Math.random() + i.toString()} value={mun.nome} />
                                    )) : (<></>)
                                }
                            </datalist>
                        </Form.Group>
                        <Form.Group className="mt-4">
                            Já tem cadastro? Faça o login
                            <Link to="">
                                <Button variant="success" size="sm" style={{ marginLeft: '2em' }} block>
                                    Login
                                 </Button>
                            </Link>
                        </Form.Group>
                        <div style={{ width: "83%", textAlign: "center" }}>
                            <Button block size="lg" disabled={!validSubmit() ? true : false} className="mt-3" variant="dark" type="submit" onClick={async () => { await handleSubmit(); }}>
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
                                CADASTRAR
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
            </Row>
        </Container>
    )
}

export default Register;