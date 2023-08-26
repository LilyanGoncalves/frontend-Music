import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useState } from 'react';
import '../css/form.css'
import { urlBase } from "../utilitarios/definicoes";

function reloadPage() {
  window.location.reload();
}

function TelaFormularioIntegrante(props) {
  const [validado, setValidado] = useState(false);
  const [integrante, setIntegrante] = useState(props.integrante);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setIntegrante({ ...integrante, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (props.modoEdicao) {
        fetch(urlBase + "/integrante", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(integrante)
        }).then((resposta) => {
          return resposta.json();
        })
          .then((dados) => {
            if (dados.status) {
              reloadPage()
              props.setModoEdicao(false);
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
        fetch(urlBase + "/integrante", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(integrante)
        }).then((resposta) => {
          return resposta.json();

        }).then((dados) => {
          if (dados.status) {
            props.setModoEdicao(false);
            props.exibirTabela(true);
            reloadPage()
            alert('INTEGRANTE CADASTRADO COM SUCESSO!');
          } else {
            alert('ERRO AO CADASTRAR! VERIFIQUE OS DADOS INFORMADOS');
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

  function carregaFuncoes() {
    let items = [];
    for (let i = 0; i < props.listaFuncoes.length; i++) {
      let el = props.listaFuncoes[i]
      items.push(<option key={el.id} value={el.id} >{el.nome}</option>);
    }
    return items;
  }


  return (
    <Container className="formulario">
      <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className="mb-4">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF:</Form.Label>
              <Form.Control type="number" value={integrante.cpf} onChange={manipularMudanca} id="cpf" placeholder="informe seu cpf sem pontos." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe seu cpf!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome: </Form.Label>
              <Form.Control type="text" value={integrante.nome} onChange={manipularMudanca} id="nome" placeholder="informe o nome completo." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o nome completo!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço:</Form.Label>
              <Form.Control type="text" placeholder="informe o endereço." value={integrante.endereco} onChange={manipularMudanca} id="endereco" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o endereco!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Bairro:</Form.Label>
              <Form.Control type="text" value={integrante.bairro} onChange={manipularMudanca} id="bairro" placeholder="informe seu bairro." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe seu bairro!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control type="text" value={integrante.cidade} onChange={manipularMudanca} id="cidade" placeholder="informe sua cidade" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe sua cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Estado: </Form.Label>
              <Form.Select aria-label="Default select example" value={integrante.uf} onChange={manipularMudanca} id="uf">
                <option>Selecione o Estado</option>
                <option value="SP">São Paulo</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone:</Form.Label>
              <Form.Control type="number" value={integrante.telefone} onChange={manipularMudanca} id="telefone" placeholder="(00)0000-0000" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe seu telefone!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="text" value={integrante.email} onChange={manipularMudanca} id="email" placeholder="informe seu email" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe sua email!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Função: </Form.Label>
              <Form.Select aria-label="Default select example" value={integrante.funcaoid} defaultValue={integrante.funcaoid} onChange={manipularMudanca} id="funcaoid">
                <option>Sua função</option>
                {carregaFuncoes()}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="button" variant="secondary" onClick={() => {
              props.exibirTabela(true);
              props.limparForm();
            }} className="mx-3">Voltar</Button>
            <Button type="reset" variant="danger">Cancelar</Button>
            <Button type="submit" variant="success" className="mx-3" >Concluir</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default TelaFormularioIntegrante;