import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { urlBase } from "../utilitarios/definicoes";
import { useEffect, useState } from 'react';

function TabelaEvento(props) {
    const [eventos, setEventos] = useState(props.listaEventos);

    function excluirEvento(codigo) {
        const listaAtualizada = eventos.filter((evento) => evento.codigo !== codigo);
        setEventos(listaAtualizada);
        props.setEventos(listaAtualizada);
        deletarEvento(codigo)
    }

    function filtraEvento(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/evento", { method: "GET" }).then((resposta) => {
            return resposta.json()
        }).then((listaEventos) => {
            if (Array.isArray(listaEventos)) {
                const resultadoBusca = listaEventos.filter((evento) => evento.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                props.setEvento(resultadoBusca);
            }

        })
    }

    useEffect(() => {
        fetch(`${urlBase}/evento`)
            .then(response => response.json())
            .then(data => {
                setEventos(data);
                props.setEventos(data);
            })
            .catch(error => console.error(error));
    }, []);


    async function deletarEvento(codigoo) {
        try {
            const response = await fetch(`${urlBase}/evento`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: codigoo
                })
            });

            if (response.ok) {
                // Evento excluído com sucesso
                alert('Evento excluído com sucesso!');
            } else {
                throw new Error('Falha ao excluir evento');
            }
        } catch (erro) {
            // Lidar com erros de exclusão
            console.error(erro);
            alert('Erro ao excluir evento: ' + erro.message);
        }
    }

    return (
        <Container className='m-5'>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Pesquisar"
                        onChange={filtraEvento} />
                </Col>
                <Col>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </Button>
                </Col>
                <Col>
                    <Button onClick={() => { props.exibirTabela(false) }}>
                        Cadastrar
                    </Button>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Titulo</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Descrição</th>
                            <th>Banda</th>
                            <th>Musicas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaEventos?.map((evento) => {
                                return <tr key={evento.codigo}>
                                    <td>{evento.codigo}</td>
                                    <td>{evento.nome}</td>
                                    <td>{evento.data}</td>
                                    <td>{evento.hora}</td>
                                    <td>{evento.descricao}</td>
                                    <td>{evento.banda}</td>
                                    <td>{evento.musica}</td>
                                    <td>
                                        <Button onClick={()=>{props.editarEvento(eventos)}} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </Button>
                                        <Button onClick={() => {
                                            if (window.confirm("confirma solicitacao de exclusao do cliente??"))
                                                excluirEvento(evento.codigo)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Row>

        </Container>
    );
}

export default TabelaEvento;