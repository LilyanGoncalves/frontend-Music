import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { urlBase } from '../utilitarios/definicoes';


function TelaLogin() {

  function autentica() {
    debugger;

    const cpf = document.getElementById("formLogin").value;
    const senha = document.getElementById("formSenha").value;

    fetch(urlBase + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login: cpf, senha: senha })
    }).then((resposta) => {
      return resposta.json();
    })
      .then((dados) => {
        debugger;
        if (dados.status === true)  {
          window.alert("Logado com Sucesso");
          window.location.href = "http://localhost:3000/home"
          
        } else {
          
          window.alert("Usuario ou Senha Invalido");
        }
      })
      .catch((erro) => {
        window.alert("Erro ao Logar");
      })



  }




  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form>
            <Form.Group className="mb-3" controlId="formLogin">
              <Form.Label>CPF</Form.Label>
              <Form.Control type="text" placeholder="Informe o CPF" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Lembrar" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => { autentica(); }}>
              ENTRAR
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TelaLogin;