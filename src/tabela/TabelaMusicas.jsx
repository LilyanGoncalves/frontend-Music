import { Button, Container, Form, Row, Table, InputGroup } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TabelaMusicas(props) {

    function excluirMusica(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });
        fetch(urlBase + "/musica",
            {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
            })
            .then(async (resposta) => {
                const resp = JSON.parse(await resposta.text())
                if (resp.affectedRows >= 1) {
                    alert("Musica excluida com sucesso");
                    //Código usado no exemplo em sala de aula
                    const listaAtualizada = props.listaMusicas
                    .filter((musica) => musica.id !== id)
                    props.setListaMusicas(listaAtualizada);
                }
                else {
                    alert("Erro ao excluir musica, tente novamente!")
                }
            })
    }

    function filtrarMusicas(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/musica", { Method: "GET" })
            .then((resposta) => {
                return resposta.json()
            })
            .then((listaMusicas) => {
                if (Array.isArray(listaMusicas)) {
                    const resultadoBusca = listaMusicas.filter((musica) => 
                        musica.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setListaMusicas(resultadoBusca);
                }
            })
    }

    return (
        <Container className="m -3">
            <Button onClick={() => {
                props.exibirTabela(false);
            }}>
                Cadastrar
            </Button>
            <Container className="m-3">
                <Row>
                    <InputGroup>
                        <Form.Control type="text"
                            id="termoBusca"
                            onChange={filtrarMusicas}
                        />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </InputGroup>
                </Row>
            </Container>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Interprete Versão</th>
                        <th>Tom Original</th>
                        <th>Links</th>
                        <th>Bpm</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaMusicas?.map((musica) => {
                            return <tr key={musica.id}>
                                <td>{musica.nome}</td>
                                <td>{musica.interpreteVersao}</td>
                                <td>{musica.tomOriginal}</td>
                                <td>
                                    <a href={musica.linkYouTube} target='blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                                        </svg>
                                    </a>
                                    {' '}
                                    <a href={musica.linkSpotify} target='blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                                        </svg>
                                    </a>
                                </td>
                                <td>{musica.bpm}</td>
                                <td>
                                    <button onClick={() => {
                                        props.editarMusica(musica)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil"
                                            viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </button>
                                    {' '}
                                    <button onClick={() => {
                                        if (window.confirm("Confirma a exclusão da Musica?")) {
                                            excluirMusica(musica.id);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash3"
                                            viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}