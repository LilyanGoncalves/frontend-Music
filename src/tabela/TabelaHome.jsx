import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import '../css/card.css';

export default function CardsEventosHome(props) {
    return (

        <Container className='home'>
            <Row>
                <Col>
                    <Card.Title>Próximos Eventos</Card.Title>
                    {
                        props.listaEventos?.map((eventos) => {
                            return <div key={eventos.codigo}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Row>
                                            <Card.Title>{eventos.nome}:</Card.Title>
                                            <Card.Subtitle>Data: {eventos.data}</Card.Subtitle>
                                            <Card.Subtitle>Hora: {eventos.hora}</Card.Subtitle>
                                            <Card.Text>
                                                descrição: {eventos.descricao}
                                            </Card.Text>
                                            <Card.Subtitle>Banda: </Card.Subtitle>{eventos.banda}
                                            <Card.Subtitle>Musica: </Card.Subtitle>{eventos.musica}
                                        </Row>
                                        <Button variant="primary">Quero Ver</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        })
                    }
                </Col>
                <Col>
                    <Card.Title>Calendario vai abaixo</Card.Title>
                </Col>
            </Row>
        </Container>
    );
}