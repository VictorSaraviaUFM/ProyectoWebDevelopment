import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaUsers, FaUser } from 'react-icons/fa';

const Favorites = () => {
  const [favorites, setFavorites] = useState({
    teams: [
      { id: 1, name: 'Real Madrid', league: 'La Liga', matches: 25, wins: 18 },
      { id: 2, name: 'FC Barcelona', league: 'La Liga', matches: 25, wins: 16 }
    ],
    players: [
      { id: 1, name: 'Lionel Messi', team: 'Inter Miami', goals: 12, assists: 8, rating: 92 },
      { id: 2, name: 'Cristiano Ronaldo', team: 'Al Nassr', goals: 15, assists: 4, rating: 90 },
      { id: 3, name: 'Pedri', team: 'FC Barcelona', goals: 5, assists: 7, rating: 88 }
    ]
  });

  const removeTeam = (teamId) => {
    setFavorites(prev => ({
      ...prev,
      teams: prev.teams.filter(team => team.id !== teamId)
    }));
  };

  const removePlayer = (playerId) => {
    setFavorites(prev => ({
      ...prev,
      players: prev.players.filter(player => player.id !== playerId)
    }));
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Mis Favoritos</h1>
        </Col>
      </Row>

      {/* Equipos Favoritos */}
      <Row className="mb-5">
        <Col>
          <Card className="futstats-card">
            <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <FaUsers className="me-2" />
                Mis Equipos Favoritos
              </h4>
              <Badge bg="light" text="dark">{favorites.teams.length} equipos</Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                {favorites.teams.map(team => (
                  <Col key={team.id} lg={6} className="mb-3">
                    <Card className="team-card h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title">{team.name}</h5>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeTeam(team.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                        <p className="text-muted mb-2">{team.league}</p>
                        <div className="d-flex justify-content-between">
                          <small>Partidos: <strong>{team.matches}</strong></small>
                          <small>Victorias: <strong>{team.wins}</strong></small>
                          <small>Eficacia: <strong>{Math.round((team.wins/team.matches)*100)}%</strong></small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <Button variant="primary">
                  <FaPlus className="me-1" />
                  Agregar Equipo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Jugadores Favoritos */}
      <Row>
        <Col>
          <Card className="futstats-card">
            <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <FaUser className="me-2" />
                Mis Jugadores Favoritos
              </h4>
              <Badge bg="light" text="dark">{favorites.players.length} jugadores</Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                {favorites.players.map(player => (
                  <Col key={player.id} lg={4} md={6} className="mb-3">
                    <Card className="player-card h-100">
                      <Card.Body className="text-center">
                        <div className="player-rating mx-auto mb-3">
                          {player.rating}
                        </div>
                        <h6 className="card-title">{player.name}</h6>
                        <p className="text-muted small mb-3">{player.team}</p>
                        <div className="d-flex justify-content-around mb-3">
                          <div>
                            <div className="fw-bold text-primary">{player.goals}</div>
                            <small>Goles</small>
                          </div>
                          <div>
                            <div className="fw-bold text-info">{player.assists}</div>
                            <small>Asistencias</small>
                          </div>
                        </div>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removePlayer(player.id)}
                        >
                          <FaTrash className="me-1" />
                          Quitar
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div className="text-center mt-3">
                <Button variant="primary">
                  <FaPlus className="me-1" />
                  Agregar Jugador
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;