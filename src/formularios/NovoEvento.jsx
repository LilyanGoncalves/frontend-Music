import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useState } from 'react';
import { urlBase } from "../utilitarios/definicoes";


function NovoEvento(props) {
  const [validado, setValidado] = useState(false);
  const [eventos, setEventos] = useState({
    codigo: '',
    nome: '',
    data: '',
    hora: '',
    descricao: '',
    banda: '',
    musica: ''
  });

  function manipulaMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEventos({ ...eventos, [id]: valor });
  }

  function reloadPage() {
    window.location.reload();
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        fetch(urlBase + "/evento", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventos)
        }).then((resposta) => {
          alert('CLIENTE ATUALIZADO COM SUCESSO!!');
          props.setModoEdicao(false);
          props.exibirTabela(true);
          reloadPage()
        });
      }
      else {
        fetch(urlBase + "/evento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventos)
        }).then((resposta) => {
          return resposta.json();

        }).then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            let novaLista = props.listaEventos;
            novaLista.push(eventos);
            props.setClientes(novaLista);
            props.exibirTabela(true);
            alert('INTEGRANTE CADASTRADO COM SUCESSO!');
          }

        }).catch((erro) => {
          window.alert("ERRO AO EXECUTAR A REQUISICAO:  " + erro.message);
        })
      }
      setValidado(false);


    }
    else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <Container className="formulario">
      <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className="mb-5">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Codigo: </Form.Label>
              <Form.Control type="number" onChange={manipulaMudanca} value={eventos.codigo} id="codigo" placeholder="informe o id do evento." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o id do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Titulo do Evento: </Form.Label>
              <Form.Control type="text" value={eventos.nome} onChange={manipulaMudanca} id="nome" placeholder="informe o titulo do evento." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o titulo do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Data do Evento:</Form.Label>
              <Form.Control type="date" value={eventos.data} onChange={manipulaMudanca} id="data" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o data do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Hora do Evento:</Form.Label>
              <Form.Control type="time" value={eventos.hora} onChange={manipulaMudanca} id="hora" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe a hora do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Descrição do Evento: </Form.Label>
              <Form.Control as="textarea" value={eventos.descricao} onChange={manipulaMudanca} id="descricao" placeholder="Por favor informe a descrição do evento!" style={{ height: '250px' }} />
              <Form.Control.Feedback type='invalid'>
                Por favor informe a descrição do evento!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Selecione a Banda: </Form.Label>
              <Form.Select aria-label="Default select example" value={eventos.banda} onChange={manipulaMudanca} id="banda">
                <option>Selecione qual banda vai tocar</option>
                <option value="Roger: Piano, Thiago: Vocal, Heyder: Violão">Roger: Piano, Thiago: Vocal, Heyder: Violão</option>
                <option value="Cristiano: Bateria, Matheus: Guitarra, José: Vocal">Cristiano: Bateria, Matheus: Guitarra, José: Vocal</option>
                <option value="Clayton: Vocal, Joaquim: Piano, Marcelo: Guitarra">Clayton: Vocal, Joaquim: Piano, Marcelo: Guitarra</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Selecione as Musicas: </Form.Label>
              <Form.Select aria-label="Default select example" value={eventos.musica} onChange={manipulaMudanca} id="musica">
                <option>Selecione as Musicas</option>
                <option value="Raridade">Raridade</option>
                <option value="Ruja o Leão">Ruja o Leão</option>
                <option value="O cordeiro e o Leão">O cordeiro e o Leão</option>
                <option value="Grandes Coisas">Grandes Coisas</option>
                <option value="Deserto">Deserto</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="button" variant="secondary" onClick={() => { props.exibirTabela(true) }} className="mx-3">Voltar</Button>
            <Button type="reset" variant="danger" className="mx-3">Cancelar</Button>
            <Button type="submit" variant="success" className="mx-3">Concluir</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default NovoEvento;

