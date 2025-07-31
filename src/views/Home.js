import { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { roomIDGenerator } from '../utils/RoomIDGenerator';

export default function Home() {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleCreatePizza = () => {
        const roomId = roomIDGenerator(10);
        navigate(`/editor/${roomId}`);
    };

    return (
        <div id="home-screen" className="d-flex flex-column min-vh-100">
            <Container fluid className="flex-grow-1 d-flex align-items-center justify-content-center">
                <Row>
                    <Col className="text-center mb-5">
                        <img 
                            src="/img/transparent-pizza.png" 
                            alt="Pizza slice" 
                            className="mb-3"
                            style={{width: '300px', height: 'auto'}}
                        />
                        <h1 className="display-1 mb-4 fw-bold font-monospace">codigo.pizza</h1>
                        <h2 className='fs-4'>Peer-to-peer code editor in the browser.</h2>
                        <p>Ideal for (mock) coding interviews and quick collaborations.</p>
                        <Button outline color="danger emphasis" size="lg" onClick={handleCreatePizza} className='mt-2 mb-3'>Start new editor</Button>
                        <p>
                            <small>By using our service, you agree to our <u style={{cursor: 'pointer'}} className='link-secondary' onClick={toggle}>terms</u>.</small>
                        </p>


                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Terms of service</ModalHeader>
                    <ModalBody>
                        <h6>Acceptable Use</h6>
                        <p>By using <a href='/' className='link-secondary'>codigo.pizza</a>, you agree to:</p>
                        <ul>
                            <li>Not use the service for illegal activities or content</li>
                            <li>Not abuse the system or attempt to disrupt other users</li>
                            <li>Not share malicious code, viruses, or harmful content</li>
                            <li>Not use the service to violate others' privacy or intellectual property</li>
                        </ul>
                        
                        <h6>Security Notice</h6>
                        <p>This is a peer-to-peer service. Be aware that:</p>
                        <ul>
                            <li>Your code is shared directly with collaborators</li>
                            <li>Anyone with your session URL can join and edit</li>
                            <li>Do not share sensitive information, passwords, private keys, or any confidential data</li>
                            <li>Sessions are temporary and not backed up</li>
                        </ul>
                        
                        <p>We are not responsible for any data loss or security breaches.</p>
                        <p><strong>Use at your own risk.</strong></p>
                    </ModalBody>    
                    <ModalFooter>
                        <Button color="outline-secondary" onClick={toggle}>
                            Okay 🍕
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
            <footer className="text-center py-3 mt-auto">
                <p className="mb-0">
                    Cooked by <a href="https://github.com/linnk" className="link-body-emphasis" target="_blank" rel="noreferrer">Ignacio Benavides</a> • <a href="https://github.com/linnk/codigo.pizza" className="link-secondary" target="_blank" rel="noreferrer">Fork it</a> • <a href="https://opensource.org/licenses/BSD-3-Clause" className="link-secondary" target="_blank" rel="noreferrer">BSD 3-Clause</a>
                </p>
            </footer>
        </div>
    );
}
