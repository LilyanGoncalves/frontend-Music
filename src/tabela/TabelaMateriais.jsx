import { Button, Container, Form, Row, Table, InputGroup } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function TabelaMateriais(props) {

    function excluirMaterial(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });
        fetch(urlBase + "/material",
            {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
            })
            .then(async (resposta) => {
                const resp = JSON.parse(await resposta.text())
                if (resp.affectedRows >= 1) {
                    alert("Material excluida com sucesso");
                    //Código usado no exemplo em sala de aula
                    const listaAtualizada = props.listaMateriais
                        .filter((material) => material.id !== id)
                    props.setListaMateriais(listaAtualizada);
                }
                else {
                    alert("Erro ao excluir material, tente novamente!")
                }
            })
    }

    function filtrarMateriais(e) {
        const termoBusca = e.currentTarget.value;
        fetch(urlBase + "/material", { method: "GET" })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                if (Array.isArray(dados)) {
                    const resultadoBusca = dados.filter((material) =>
                        material.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setListaMateriais(resultadoBusca);
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
                            onChange={filtrarMateriais}
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
                        <th>ID Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaMateriais?.map((material) => {
                            return <tr key={material.id}>
                                <td>{material.nome}</td>
                                <td>{material.categoriaNome}</td>
                                <td>
                                    <Button onClick={() => {
                                        props.editarMaterial(material)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square"
                                            viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Button>{' '}
                                    <Button onClick={() => {
                                        if (window.confirm("Confirma a exclusão?")) {
                                            excluirMaterial(material.id);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="16" height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}
