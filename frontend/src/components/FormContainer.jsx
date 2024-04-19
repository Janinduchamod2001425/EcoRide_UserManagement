import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <div>
        <Container>
            <Row className="md-center mt-5 d-flex justify-content-end" >
                <Col xs={12} md={6} className="card p-5 border-2 rounded-4" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
                    { children }
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default FormContainer
