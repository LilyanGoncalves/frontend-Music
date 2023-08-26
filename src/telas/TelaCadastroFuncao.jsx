import Paginas from '../templates/Paginas';
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from '../utilitarios/definicoes';
import TelaFormularioFuncao from "../formularios/TelaFormularioFuncao";
import TabelaFuncoes from "../tabela/TabelaFuncoes";

export default function TelaCadastroFuncao(props) {
    const [listaFuncoes, setListaFuncoes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [FuncaoEmEdicao, setFuncaoEmEdicao] = useState(
        {
            nome: ""
        }
    );

    useEffect(() => {
        fetch(urlBase + "/funcao", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaFuncoes(dados);
            }
            else {

            }
        });
    }, []);


    function prepararFuncaoParaEdicao(funcao) {
        setModoEdicao(true);
        setFuncaoEmEdicao(funcao);
        setExibirTabela(false);
    }

    function limparForm() {
        setFuncaoEmEdicao({});
    }

    return (
        <Paginas>
            <Container className="border">
                <Alert variant={"Danger"} className="text-center">Cadastro de Função</Alert>
                {
                    exibirTabela ?
                        <TabelaFuncoes listaFuncoes={listaFuncoes}
                            setListaFuncoes={setListaFuncoes}
                            editarFuncao={prepararFuncaoParaEdicao}
                            exibirTabela={setExibirTabela}/>
                        :
                        <TelaFormularioFuncao listaFuncoes={listaFuncoes}
                            setListaFuncoes={setListaFuncoes}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            limparForm={limparForm}
                            funcao={FuncaoEmEdicao}/>
                }
            </Container>
        </Paginas>
    );
}