import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

interface Props {
    statusModal(): void;
}

const HeaderFila: React.FC<Props> = ({ statusModal }) => {
    return (
        <Jumbotron>
            <h1>Fila de vacinação</h1>
            <p>
                Aqui você consegue acompanhar os usuários que foram vacinados e os que ainda não foram,
                e consegue ter um status de que posição é o seu usuários e quantos ainda falta para chegar
                a sua vez de ser vacinado.
                        <br /><br />
                        Fila em tempo real
                    </p>
            <p>
                <Button variant="dark" onClick={() => statusModal()}>Pesquisar por usuário</Button>
            </p>
        </Jumbotron>
    )
}

export default HeaderFila;