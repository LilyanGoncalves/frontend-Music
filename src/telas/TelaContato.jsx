import Paginas from '../templates/Paginas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function TelaContato(props) {
    return (
        <Paginas>
            <Container>
                <Row className='my-4'>
                    <Card className="text-center">
                        <Card.Header>Eventos, Bandas e Musicas</Card.Header>
                        <Card.Body>
                            <Card.Title>Conecte-se à Música: Descubra e Participe de Eventos Musicais Inesquecíveis</Card.Title>
                            <Card.Text>
                                Explore o emocionante mundo dos eventos musicais com nosso sistema abrangente. Desde os próximos shows e festivais até os destaques mais esperados, mantenha-se informado sobre as últimas notícias e lançamentos musicais. Com uma pesquisa fácil de usar, reserve seus ingressos online e desfrute de uma experiência musical única. Descubra artistas, confira galerias de fotos e vídeos dos eventos passados e compartilhe suas opiniões com a comunidade. Conecte-se à música e viva momentos memoráveis com nosso sistema de eventos de música.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">Entre em contato abaixo, boraaaa lá</Card.Footer>
                    </Card>
                </Row>
                <Row>

                </Row>
            </Container>
        </Paginas>
    );
}

export default TelaContato;