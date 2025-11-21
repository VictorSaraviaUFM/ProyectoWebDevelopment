import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          FUTSTATS
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/players">
              Jugadores
            </Nav.Link>

            <Nav.Link as={Link} to="/teams">
              Equipos
            </Nav.Link>

            <Nav.Link as={Link} to="/comments">
              Opiniones
            </Nav.Link>

            <Nav.Link as={Link} to="/profile">
              Perfil
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
