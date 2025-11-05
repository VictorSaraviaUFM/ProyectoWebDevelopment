import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaChartLine, FaUsers, FaStar, FaFutbol } from 'react-icons/fa';

const Dashboard = () => {
  const recentMatches = [
    { home: 'Real Madrid', away: 'Barcelona', score: '3-2', date: '2024-01-15' },
    { home: 'PSG', away: 'Bayern', score: '1-1', date: '2024-01-14' },
    { home: 'Man City', away: 'Liverpool', score: '2-0', date: '2024-01-13' }
  ];

  const topPlayers = [
    { name: 'Lionel Messi', team: 'Inter Miami', goals: 12, assists: 8, rating: 92 },
    { name: 'Cristiano Ronaldo', team: 'Al Nassr', goals: 15, assists: 4, rating: 90 },
    { name: 'Kylian Mbappé', team: 'PSG', goals: 14, assists: 6, rating: 91 }
  ];

  return (
    <Container className="py-4">
      {/* Stats Overview */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="futstats-card text-center h-100">
            <Card.Body className="stat-card">
              <FaChartLine size="3rem" color="var(--primary)" />
              <div className="stat-number">500K+</div>
              <div className="stat-label">Datos en Tiempo Real</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="futstats-card text-center h-100">
            <Card.Body className="stat-card">
              <FaFutbol size="3rem" color="var(--primary)" />
              <div className="stat-number">15+</div>
              <div className="stat-label">Ligas Globales</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="futstats-card text-center h-100">
            <Card.Body className="stat-card">
              <FaUsers size="3rem" color="var(--primary)" />
              <div className="stat-number">8</div>
              <div className="stat-label">Jugadores Siguiendo</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="futstats-card text-center h-100">
            <Card.Body className="stat-card">
              <FaStar size="3rem" color="var(--primary)" />
              <div className="stat-number">3</div>
              <div className="stat-label">Equipos Favoritos</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Partidos Recientes */}
        <Col lg={6} className="mb-4">
          <Card className="futstats-card h-100">
            <Card.Header className="card-header-custom">
              <h5 className="mb-0">
                <FaFutbol className="me-2" />
                Partidos Recientes
              </h5>
            </Card.Header>
            <Card.Body>
              {recentMatches.map((match, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="flex-grow-1">
                    <div className="fw-bold">{match.home} vs {match.away}</div>
                    <small className="text-muted">{match.date}</small>
                  </div>
                  <div className="badge bg-primary fs-6">{match.score}</div>
                </div>
              ))}
              <Button variant="primary" className="w-100 mt-3">
                Ver Todos los Partidos
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Jugadores */}
        <Col lg={6} className="mb-4">
          <Card className="futstats-card h-100">
            <Card.Header className="card-header-custom">
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                Jugadores Destacados
              </h5>
            </Card.Header>
            <Card.Body>
              {topPlayers.map((player, index) => (
                <div key={index} className="d-flex align-items-center py-2 border-bottom">
                  <div className="player-rating me-3">
                    {player.rating}
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold">{player.name}</div>
                    <small className="text-muted">{player.team}</small>
                  </div>
                  <div className="text-end">
                    <div className="small">⚽ {player.goals} • 🎯 {player.assists}</div>
                  </div>
                </div>
              ))}
              <Button variant="primary" className="w-100 mt-3">
                Explorar Jugadores
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;