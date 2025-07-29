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
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row>
                <Col className="text-center">
                    <h1 className="display-1 mb-4">codigo.pizza</h1>
                    <Button color="primary" size="lg" onClick={handleCreatePizza}>Create pizza</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;