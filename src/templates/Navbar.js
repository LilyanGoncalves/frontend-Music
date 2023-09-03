import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
//<LinkContainer to=""></LinkContainer>
function Navegation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>Sistema de Gerenciamento</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
            <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
              <LinkContainer to="/integrantes"><NavDropdown.Item>Integrantes</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/funcoes"><NavDropdown.Item>Funções</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/musicas"><NavDropdown.Item>Musicas</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/materiais"><NavDropdown.Item>Materiais</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/categoriamateriais"><NavDropdown.Item>Categoria de Materiais</NavDropdown.Item></LinkContainer>
            </NavDropdown>
            <LinkContainer to="/contato"><Nav.Link>Contato</Nav.Link></LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link href="sair">Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegation;