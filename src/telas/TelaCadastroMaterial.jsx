import Paginas from '../templates/Paginas';
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from '../utilitarios/definicoes';
import TelaFormularioMaterial from "../formularios/TelaFormularioMaterial";
import TabelaMateriais from "../tabela/TabelaMateriais";

export default function TelaCadastroMaterial(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaMateriais, setListaMateriais] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [materialEmEdicao, setMaterialEmEdicao] = useState({
        nome: ""
    });
    
    function prepararMaterialParaEdicao(material) {
        debugger
        setModoEdicao(true);
        setMaterialEmEdicao(material);
        setExibirTabela(false);
    }

    function limparForm() {
        setModoEdicao(false);
        setMaterialEmEdicao({});
    }


    useEffect(() => {
        fetch(urlBase + "/material", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaMateriais(dados);
            }
        });
    }, []);  //<--WillMount

    return (
        <Paginas>
            <Container className="border">
                <Alert variant={"Primary"}>Cadastro de Materiais</Alert>
                {
                    exibirTabela ?
                        <TabelaMateriais listaMateriais={listaMateriais}
                            setListaMateriais={setListaMateriais}
                            exibirTabela={setExibirTabela}
                            editarMaterial={prepararMaterialParaEdicao}
                        />
                        :
                        <TelaFormularioMaterial listaMateriais={listaMateriais}
                            setListaMateriais={setListaMateriais}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            limparForm={limparForm}
                            material={materialEmEdicao}
                        />

                }
            </Container>
        </Paginas>
    );
}