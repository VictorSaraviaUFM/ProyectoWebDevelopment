import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <div className="d-flex align-items-center mb-3">
              <span className="logo-icon">⚽</span>
              <strong className="fs-4">FutStats</strong>
              <span className="beta-badge ms-2">BETA</span>
            </div>
            <p className="text-muted mb-0">
              Plataforma de analytics futbolístico - Proyecto Académico
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-1"><strong>Desarrollo Web - 2025</strong></p>
            <p className="text-muted mb-0">Víctor Saravia - Carné 20240060</p>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              &copy; 2025 FutStats. Proyecto académico con fines educativos.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;