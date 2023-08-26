import Paginas from '../templates/Paginas';
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import TabelaMusicas from "../tabela/TabelaMusicas";
import TelaFormularioMusica from "../formularios/TelaFormularioMusica";

export default function TelaCadastroMusica(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaMusicas, setListaMusicas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [musicaEmEdicao, setMusicaEmEdicao] = useState({
        id: "",
        nome: "",
        interpreteOriginal: "",
        interpreteVersao: "",
        tomM: "",
        tomF: "",
        tomOriginal: "",
        linkYouTube: "",
        linkSpotify: "",
        cifra: "",
        bpm: ""
    });


    function preparaMusicaParaEdicao(musica) {
        setModoEdicao(true);
        setMusicaEmEdicao(musica);
        setExibirTabela(false);
    }

    function limparForm() {
        setModoEdicao(false);
        setMusicaEmEdicao({});
    }


    useEffect(() => {
        fetch(urlBase + "/musica", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaMusicas(dados);
            }
        });
    }, []);

    return (
        <Paginas>
            <Container className="border m-3">
                <Alert variant={"secondary"} className="text-center m-3"> Cadastro de Músicas </Alert>
                {
                    // operação ternário
                    exibirTabela ?
                        <TabelaMusicas listaMusicas={listaMusicas}
                            setListaMusicas={setListaMusicas}
                            exibirTabela={setExibirTabela}
                            editarMusica={preparaMusicaParaEdicao} />
                        :
                        <TelaFormularioMusica listaMusicas={listaMusicas}
                            setListaMusicas={setListaMusicas}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            limparForm={limparForm}
                            musica={musicaEmEdicao} />
                }
            </Container>
        </Paginas>
    );
}

