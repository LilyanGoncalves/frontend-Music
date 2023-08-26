import Paginas from '../templates/Paginas';
import TabelaHome from '../tabela/TabelaHome'
import { useState } from 'react';

function TelaCard(){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [eventos, setEventos] = useState([]);
    return (
        <Paginas>
            <TabelaHome setEventos={setEventos} listaEventos={eventos} exibirTabela={setExibirTabela}/>
        </Paginas>
    );
  }
  
export default TelaCard;