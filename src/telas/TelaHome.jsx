import Paginas from '../templates/Paginas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/home.css'


function TelaHome(props) {
    return (
        <Paginas>
            <Container className='home'>
                <Row>
                    <Col>
                        <Row className='my-3'>
                            <Col>
                                <Card.Title className='text-center'>Próximos Eventos</Card.Title>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 27/06/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='my-3'>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 01/07/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>Data: 04/07/2023</Card.Title>
                                        <Card.Text>
                                            <p>Banda:<br />
                                                Heyder: Violão<br />
                                                Roger: Piano<br />
                                                Thiago: Vocal<br />
                                            </p>

                                            <p>Musica:<br />
                                                O Cordeiro e o Leão
                                            </p>
                                        </Card.Text>
                                        <Button variant="primary">Quero Ver</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Paginas>
    );
}

export default TelaHome;