import { Form, Row, Col, Container, Button, Table } from "react-bootstrap";
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
    debugger
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

  function removerFuncao(id) {
    // Filtrar o array para remover a função com o ID fornecido
    const novaListaFuncao = integrante.listaFuncao.filter((funcao) => funcao.id !== id);

    // Atualizar o estado com a nova lista de funções
    setIntegrante({
      ...integrante,
      listaFuncao: novaListaFuncao,
    });

    alert('Função removida');
  }

  function adicionaFuncao() {
    debugger
    const f = document.getElementById("selectfuncao");
    const novaFuncaoId = +f[f.selectedIndex].value;
    const novaFuncaoNome = props.listaFuncoes.filter((f) => f.id === novaFuncaoId)[0]?.nome;

    if (!novaFuncaoNome) {
      alert('Função não encontrada');
      return;
    }

    // Verificar se a função já existe na lista
    const funcaoExistente = integrante.listaFuncao.find((funcao) => funcao.id === novaFuncaoId);

    if (funcaoExistente) {
      alert('A função já foi adicionada anteriormente.');
      return;
    }

    // Adicionar a nova função à lista
    const novaFuncao = { id: novaFuncaoId, nome: novaFuncaoNome };
    setIntegrante({
      ...integrante,
      listaFuncao: [...integrante.listaFuncao, novaFuncao],
    });

    alert('Função adicionada com sucesso');
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome: </Form.Label>
              <Form.Control type="text" value={integrante.nome} onChange={manipularMudanca} id="nome" placeholder="informe o nome completo." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o nome completo!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Endereço:</Form.Label>
              <Form.Control type="text" placeholder="informe o endereço." value={integrante.endereco} onChange={manipularMudanca} id="endereco" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe o endereco!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Bairro:</Form.Label>
              <Form.Control type="text" value={integrante.bairro} onChange={manipularMudanca} id="bairro" placeholder="informe seu bairro." required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe seu bairro!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control type="text" value={integrante.cidade} onChange={manipularMudanca} id="cidade" placeholder="informe sua cidade" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe sua cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
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
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone:</Form.Label>
              <Form.Control type="number" value={integrante.telefone} onChange={manipularMudanca} id="telefone" placeholder="(00)0000-0000" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe seu telefone!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="text" value={integrante.email} onChange={manipularMudanca} id="email" placeholder="informe seu email" required />
              <Form.Control.Feedback type='invalid'>
                Por favor informe sua email!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>FUNÇÕES</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Função: </Form.Label>
              <Form.Select aria-label="Default select example" id="selectfuncao" >
                <option>Selecione uma função</option>
                {carregaFuncoes()}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Button type="button" variant="success" className="mx-2"
              style={{ marginTop: '33px' }}
              onClick={() => {
                adicionaFuncao();
              }}>Adicionar</Button>
          </Col>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Funcao</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                integrante.listaFuncao?.map((funcao) => {
                  return <tr key={funcao.nome}>
                    <td>{funcao.nome}</td>
                    <td>
                      <Button onClick={() => {
                        if (window.confirm("Confirma a exclusão?")) {
                          removerFuncao(funcao.id);
                        }
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </Button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col>
            <Button type="button" variant="secondary" onClick={() => {
              props.exibirTabela(true);
              props.limparForm();
            }} className="mx-3">Voltar</Button>
            <Button type="reset" variant="danger">Cancelar</Button>
            <Button type="submit" variant="success" className="mx-3" >Salvar</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default TelaFormularioIntegrante;