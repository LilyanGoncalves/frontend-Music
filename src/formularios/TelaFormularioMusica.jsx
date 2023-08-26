import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaFormularioMusica(props) {
    const [validado, setValidado] = useState(false);
    const [musica, setMusica] = useState(props.musica);

    function manipularMudanca(e) {
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setMusica({ ...musica, [id]: valor });
    }
    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                fetch(urlBase + "/musica", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(musica)
                }).then((resposta) => {
                    return resposta.json();
                })
                .then((dados) => {
                    if (dados.status) {
                        const id = musica.id;
                        const listaAtualizada = props.listaMusicas
                        .filter((musica) => musica.id !== id)
                        props.setModoEdicao(false);
                        listaAtualizada.push(musica);
                        props.setListaMusicas(listaAtualizada);
                        props.exibirTabela(true);
                        props.limparForm();
                    }
                    window.alert(dados.mensagem);
                })
                .catch((erro) => {
                    window.alert("Erro ao executar a requisição:" + erro.message);
                })
            }
            else {
                fetch(urlBase + "/musica", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(musica)
                }).then((resposta) => {
                    return resposta.json();
                })
                    .then((dados) => {
                        if (dados.status) {
                            props.setModoEdicao(false);
                            let novaLista = props.listaMusicas;
                            musica.id = dados.id
                            novaLista.push(musica);
                            props.setListaMusicas(novaLista);
                            props.exibirTabela(true);
                            props.limparForm();
                        }
                        else {
                            alert('Erro ao Cadastrar! Verifique os dados informados');
                        }
                        window.alert(dados.mensagem);
                    })
                    .catch((erro) => {
                        window.alert("Erro ao executar a requisição:" + erro.message);
                    })
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
            <Container className="text-center"><br />
                <h3> Cadastro de Musicas</h3><br />
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label> Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome da musica"
                                value={musica.nome}
                                id="nome"
                                onChange={manipularMudanca}
                                required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o nome!
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Interprete Original</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o interprete Original"
                                value={musica.interpreteOriginal}
                                id="interpreteOriginal"
                                onChange={manipularMudanca}
                                required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o interpreteOriginal!
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Interprete Versão</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o interprete Versão"
                                value={musica.interpreteVersao}
                                id="interpreteVersao"
                                onChange={manipularMudanca}
                                required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o interpreteVersao!
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Tom Masculino</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o tom M"
                                value={musica.tomM}
                                id="tomM"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor informe tomM.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Tom Feminino</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o tom F"
                                value={musica.tomF}
                                id="tomF"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Informe o tomF!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Tom Original</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o tom Original"
                                value={musica.tomOriginal}
                                id="tomOriginal"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor tomOriginal!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Link YouTube</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o link do YouTube"
                                value={musica.linkYouTube}
                                id="linkYouTube"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor linkYouTube!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Link Spotify</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=" Informe o link do Spotify"
                                value={musica.linkSpotify}
                                id="linkSpotify"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor linkSpotify!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Cifra</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe a cifra"
                                value={musica.cifra}
                                id="cifra"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor cifra!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" >
                            <Form.Label>Bpm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Informe o bpm"
                                value={musica.bpm}
                                id="bpm"
                                onChange={manipularMudanca}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Por favor bpm!
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row>
                        <Col md={2} style={{ display: 'flex' }}>
                            <Button type="submit" variant="success"> {props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>
                            {' '}
                            <Button type="button" onClick={() => {
                                props.exibirTabela(true);
                                props.limparForm();
                            }} variant="danger">Voltar</Button>
                        </Col>
                    </Row>
                </Row>
            </Form >
        </>
    );
}        