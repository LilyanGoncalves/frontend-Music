import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase } from '../utilitarios/definicoes';

export default function TelaFormularioMaterial(props) {
  const [validado, setValidado] = useState(false);
  const [material, setMaterial] = useState(props.material);

  function manipularMudanca(e) {
    const elemform = e.currentTarget;
    const id = elemform.id;
    const valor = elemform.value;
    setMaterial({ ...material, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        fetch(urlBase + "/material", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(material)

        }).then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          if (dados.status) {
              const id = material.id;
              const listaAtualizada = props.listaMateriais
              .filter((material) => material.id !== id)
              props.setModoEdicao(false);
              listaAtualizada.push(material);
              props.setListaMateriais(listaAtualizada);
              props.exibirTabela(true);
              props.limparForm();
          }
          window.alert(dados.mensagem);
      })
      .catch((erro) => {
          window.alert("Erro ao executar a requisição:" + erro.message);
      })

      }
      else {
        fetch(urlBase + "/material", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(material)
        }).then((resposta) => {
          return resposta.json();
        })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaMateriais;
              debugger
              material.id = dados.id
              novaLista.push(material);
              props.setListaMateriais(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Cadastrado com sucesso");
          })
      }
      setValidado(false);
    }
    else {

      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  };

  return (
    <>
      <Container className="text-center">
        <h3>Cadastro de Materiais</h3>
      </Container>

      <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" >
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" value={material.nome} id="nome" onChange={manipularMudanca} required />
            <Form.Control.Feedback type="invalid" >
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" variant="success"> {props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>
        {' '}
        <Button type="button" onClick={() => {
          props.exibirTabela(true);
        }}>Voltar</Button>

      </Form>
    </>
  );
}

