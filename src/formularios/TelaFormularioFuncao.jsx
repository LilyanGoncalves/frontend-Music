import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase } from '../utilitarios/definicoes';

export default function TelaFormularioFuncao(props) {
  const [validado, setValidado] = useState(false);
  const [funcao, setFuncao] = useState(props.funcao);

  function manipularMudanca(e) {
    debugger
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setFuncao({ ...funcao, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        fetch(urlBase + "/funcao", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(funcao)

        }).then((resposta) => {
          return resposta.json();
        })
          .then((dados) => {
            if (dados.status) {
              const id = funcao.id;
              const listaAtualizada = props.listaFuncoes
                .filter((funcao) => funcao.id !== id)
              props.setModoEdicao(false);
              listaAtualizada.push(funcao);
              props.setListaFuncoes(listaAtualizada);
              props.exibirTabela(true);
              props.limparForm();
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição" + erro.mensagem);
          })
      }
      else {
        fetch(urlBase + "/funcao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(funcao)
        }).then((resposta) => {
          return resposta.json();
        })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaFuncoes;
              funcao.id = dados.id
              novaLista.push(funcao);
              props.setListaFuncoes(novaLista);
              props.exibirTabela(true);
              props.limparForm();
            } 
            else {
              alert('Erro ao Cadastrar! Verifique os dados informados');
          }
          window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição" + erro.mensagem);
          })
      }
      setValidado(false)
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
        <h3>Cadastro de Função</h3>
      </Container>

      <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nome da Função</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome da Função"
              value={funcao.nome}
              id="nome"
              onChange={manipularMudanca}
              required
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Control.Feedback></Form.Control.Feedback>
        </Row>
        <Row className="mb-3">
        </Row>
        <Button type="submit" variant="success"> {props.modoEdicao ? "Atualizar" : "Cadastrar"}</Button>
        {' '}
        <Button type="button" onClick={() => {
          props.exibirTabela(true);
          props.limparForm();
        }}>voltar</Button>
      </Form>
    </>
  );
}

