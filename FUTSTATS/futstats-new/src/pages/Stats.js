import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Stats = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Estadísticas Avanzadas</h1>
          <p className="text-center text-muted">
            Explora estadísticas detalladas de jugadores y equipos
          </p>
        </Col>
      </Row>

      {/* Filtros de Búsqueda */}
      <Row className="mb-4">
        <Col>
          <Card className="futstats-card">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      <FaSearch className="me-1" />
                      Buscar
                    </Form.Label>
                    <Form.Control type="text" placeholder="Nombre de jugador o equipo..." />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>
                      <FaFilter className="me-1" />
                      Liga
                    </Form.Label>
                    <Form.Select>
                      <option>Todas las Ligas</option>
                      <option>La Liga</option>
                      <option>Premier League</option>
                      <option>Serie A</option>
                      <option>Bundesliga</option>
                      <option>Ligue 1</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Posición</Form.Label>
                    <Form.Select>
                      <option>Todas las Posiciones</option>
                      <option>Delantero</option>
                      <option>Mediocampista</option>
                      <option>Defensa</option>
                      <option>Portero</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>&nbsp;</Form.Label>
                    <div className="d-grid">
                      <button className="btn btn-primary">Aplicar</button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mensaje de Desarrollo */}
      <Row>
        <Col>
          <Card className="futstats-card text-center">
            <Card.Body className="py-5">
              <div className="display-1 text-muted mb-3">⚡</div>
              <h3>Estadísticas en Desarrollo</h3>
              <p className="text-muted mb-4">
                Esta sección estará disponible pronto con gráficos interactivos, 
                comparativas avanzadas y análisis detallados de rendimiento.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="row text-start">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">✅ Gráficos de rendimiento</li>
                        <li className="mb-2">✅ Comparativas entre jugadores</li>
                        <li className="mb-2">✅ Estadísticas en tiempo real</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">✅ Métricas avanzadas (xG, xA)</li>
                        <li className="mb-2">✅ Análisis tácticos</li>
                        <li className="mb-2">✅ Datos históricos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;