import Paginas from '../templates/Paginas';
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from '../utilitarios/definicoes';
import TelaFormularioMaterial from "../formularios/TelaFormularioMaterial";
import TabelaMateriais from "../tabela/TabelaMateriais";

export default function TelaCadastroMaterial(props) {
    const [listaMateriais, setListaMateriais] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [materialEmEdicao, setMaterialEmEdicao] = useState({
        nome: "",
        idcategoria: "",
        categoriaNome: ""
    });
    const [listaCategoriaMateriais, setListaCategoriaMateriais] = useState([]);

    function prepararMaterialParaEdicao(material) {
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
            debugger
            if (Array.isArray(dados)) {
                setListaMateriais(  );
                console.log(listaMateriais, listaMateriais.length);
            }
        });

        //Carregar categorias dinamicamente do Banco de dados
        fetch(urlBase + "/categoriamaterial", {
            methodt: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaCategoriaMateriais(dados);
                listaMateriais.map((material) =>{
                    material.categoriaNome = listaCategoriaMateriais.filter((categoria) => categoria.id === material.idcategoria)
                })
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