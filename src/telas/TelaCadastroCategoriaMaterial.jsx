import Paginas from '../templates/Paginas';
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from '../utilitarios/definicoes';
import TelaFormularioCategoriaMaterial from "../formularios/TelaFormularioCategoriaMaterial";
import TabelaCategoriaMateriais from "../tabela/TabelaCategoriaMateriais";

export default function TelaCadastroCategoriaMaterial(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaCategoriaMateriais, setListaCategoriaMateriais] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaMaterialEmEdicao, setCategoriaMaterialEmEdicao] = useState({
        nome: ""
    });
    
    function prepararCategoriaMaterialParaEdicao(categoriaMaterial) {
        debugger
        setModoEdicao(true);
        setCategoriaMaterialEmEdicao(categoriaMaterial);
        setExibirTabela(false);
    }

    function limparForm() {
        setModoEdicao(false);
        setCategoriaMaterialEmEdicao({});
    }


    useEffect(() => {
        fetch(urlBase + "/categoriamaterial", {
            method: "GET"
        }).then((resposta) => {
            debugger    
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaCategoriaMateriais(dados);
            }
        });
    }, []);  //<--WillMount

    return (
        <Paginas>
            <Container className="border">
                <Alert variant={"Primary"}>Cadastro de Materiais</Alert>
                {
                    exibirTabela ?
                        <TabelaCategoriaMateriais listaCategoriaMateriais={listaCategoriaMateriais}
                            setListaCategoriaMateriais={setListaCategoriaMateriais}
                            exibirTabela={setExibirTabela}
                            editarCategoriaMaterial={prepararCategoriaMaterialParaEdicao}
                        />
                        :
                        <TelaFormularioCategoriaMaterial listaCategoriaMateriais={listaCategoriaMateriais}
                            setListaCategoriaMateriais={setListaCategoriaMateriais}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            limparForm={limparForm}
                            categoriaMaterial={categoriaMaterialEmEdicao}
                        />

                }
            </Container>
        </Paginas>
    );
}