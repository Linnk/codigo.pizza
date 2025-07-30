import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home() {
    const navigate = useNavigate();

    const handleCreatePizza = () => {
        const roomId = uuidv4();
        navigate(`/editor/${roomId}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Container fluid className="flex-grow-1 d-flex align-items-center justify-content-center">
                <Row>
                    <Col className="text-center mb-5">
                        <img 
                            src="/img/transparent-pizza.png" 
                            alt="Pizza slice" 
                            className="mb-3"
                            style={{width: '300px', height: 'auto'}}
                        />
                        <h1 className="display-1 mb-4 fw-bold">codigo.pizza</h1>
                        <p>Sharing code like sharing pizza 🍕</p>
                        <Button outline color="danger emphasis" size="lg" onClick={handleCreatePizza}>Start new editor</Button>
                    </Col>
                </Row>
            </Container>
            <footer className="text-center py-3 mt-auto">
                <p className="mb-0">
                    Cooked by <a href="https://github.com/linnk" className="link-secondary" target="_blank" rel="noreferrer">Ignacio Benavides</a> • Feel free to <a href="https://github.com/linnk/codigo.pizza" className="link-secondary" target="_blank" rel="noreferrer">Fork it</a>
                </p>
            </footer>
        </div>
    );
}

export default Home;