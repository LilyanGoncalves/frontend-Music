import Paginas from '../templates/Paginas';
import TabelaEvento from '../tabela/TabelaEventos';
import NovoEvento from '../formularios/NovoEvento';
import { useState } from 'react';


function TelaConsulta(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [eventos, setEventos] = useState([]);
    return(
        <Paginas>
            <h3 className='text-center'>Consulta Eventos</h3>
            {
                exibirTabela? 
                <TabelaEvento setEventos={setEventos} listaEventos={eventos} exibirTabela={setExibirTabela}/> 
                :
                 <NovoEvento setEventos={setEventos} listaEventos={eventos} exibirTabela={setExibirTabela}/>
            }
        </Paginas>
    );
}

export default TelaConsulta;