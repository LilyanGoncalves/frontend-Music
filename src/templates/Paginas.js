import { Container } from 'react-bootstrap';
import Header from './Header';
import Navegation from './Navbar';
import Footer from './Footer'

function Paginas(propos) {
  return (
    <div>
      <Navegation/>
      <Header texto='SISTEMA DE GERENCIAMENTO'/>
      <Container>
        {propos.children}
      </Container>
      <Footer ></Footer>
    </div>
  );
}

export default Paginas;