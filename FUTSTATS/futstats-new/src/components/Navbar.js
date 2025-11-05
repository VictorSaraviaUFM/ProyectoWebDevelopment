import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaChartBar, FaFutbol, FaStar, FaUser } from 'react-icons/fa';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="futstats-navbar">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <span className="logo-icon">⚽</span>
          <strong>FutStats</strong>
          <span className="beta-badge">BETA</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <FaChartBar className="me-1" />
                Dashboard
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stats">
              <Nav.Link>
                <FaFutbol className="me-1" />
                Estadísticas
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favorites">
              <Nav.Link>
                <FaStar className="me-1" />
                Mis Favoritos
              </Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/profile">
              <Nav.Link>
                <FaUser className="me-1" />
                Mi Perfil
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;