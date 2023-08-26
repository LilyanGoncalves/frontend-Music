import Paginas from '../templates/Paginas';
import NovoEvento from '../formularios/NovoEvento';
import TabelaEvento from '../tabela/TabelaEventos';
import { useState } from 'react';


function TelaNovoEvento(props) {
  const [exibirTabela, setExibirTabela] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atualiza, setAtualiza] = useState(false);
  const [eventoEdicao, setEventoEdicao] = useState({
    codigo: "",
    nome: "",
    data: "",
    hora: "",
    descricao: "",
    banda: "",
    musica: "",
  });

  function editarEvento(eventos) {
    setAtualiza(true);
    setModoEdicao(true);
    setEventoEdicao(eventos);
    setExibirTabela(false);
  }

  return (
    <Paginas>
      <h3 className='text-center'>Novo Evento</h3>
      {
        exibirTabela ?
          <TabelaEvento editarEvento={editarEvento} eventoEdicao={eventoEdicao} setEventoEdicao={setEventoEdicao} atualiza={atualiza} setAtualiza={setAtualiza} modoEdicao={modoEdicao} setModoEdicao={setModoEdicao} setEventos={setEventos} listaEventos={eventos} exibirTabela={setExibirTabela} />
          :
          <NovoEvento editarEvento={editarEvento} eventoEdicao={eventoEdicao} setEventoEdicao={setEventoEdicao} atualiza={atualiza} setAtualiza={setAtualiza} modoEdicao={modoEdicao} setModoEdicao={setModoEdicao} setEventos={setEventos} listaEventos={eventos} exibirTabela={setExibirTabela} />
      }
    </Paginas>
  );
}

export default TelaNovoEvento;