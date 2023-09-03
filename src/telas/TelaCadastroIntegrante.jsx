import Paginas from '../templates/Paginas';
import { useState, useEffect } from 'react';
import { urlBase } from '../utilitarios/definicoes';
import TabelaIntegrantes from '../tabela/TabelaIntegrantes';
import TelaFormularioIntegrante from '../formularios/TelaFormularioIntegrante';


function TelaCadastroIntegrante(props) {
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [integranteEdicao, setIntegranteEdicao] = useState({
        cpf: "",
        nome: "",
        endereco: "",
        bairro: "",
        cidade: "",
        uf: "",
        telefone: "",
        email: "",
        funcaoid: "",
        funcaoNome: ""
    });
    const [listaFuncoes, setListaFuncoes] = useState([]);

    function preparaIntegranteParaEdicao(integrante){
        debugger
        setModoEdicao(true);
        setIntegranteEdicao(integrante);
        setExibirTabela(false);
    }

    function limparForm() {
        setModoEdicao(false);
        setIntegranteEdicao({});
    }

    useEffect(()=>{
        fetch(urlBase + "/integrante", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setListaIntegrantes(dados);
            }
        }).finally(()=>{

        });

        //Carregar funções dinamicamente do Banco de dados
        fetch(urlBase + "/funcao", {
            methodt: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setListaFuncoes(dados);
                listaIntegrantes.map((integr)=>
                    integr.funcaoNome = listaFuncoes.filter((funcao)=>funcao.id == integr.funcaoid))
            }
        });
    },[])


    return (
        <Paginas>
            <h3 className='text-center'>Cadastro Integrante</h3>
            {
               exibirTabela? <TabelaIntegrantes 
               listaIntegrantes={listaIntegrantes} 
               setListaIntegrantes={setListaIntegrantes}
               exibirTabela={setExibirTabela} 
               editarIntegrante={preparaIntegranteParaEdicao} 
               listaFuncoes={listaFuncoes}/> 
               :
               <TelaFormularioIntegrante  
               listaIntegrantes={listaIntegrantes} 
               setListaIntegrantes={setListaIntegrantes} 
               modoEdicao={modoEdicao} 
               setModoEdicao={setModoEdicao} 
               integrante={integranteEdicao}
               limparForm={limparForm}
               exibirTabela={setExibirTabela} 
               listaFuncoes={listaFuncoes}/>
            }
        </Paginas>
    );
  }
  
export default TelaCadastroIntegrante;