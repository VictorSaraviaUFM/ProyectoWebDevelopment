import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaEdit, FaComment, FaUser, FaUsers, FaStar } from 'react-icons/fa';

const Profile = () => {
  const userStats = {
    comments: 12,
    playersFollowing: 8,
    teamsFollowing: 3,
    reputation: 85
  };

  const recentActivity = [
    { action: 'Comentó en', target: 'Lionel Messi', time: '2 horas ago' },
    { action: 'Agregó a', target: 'Real Madrid', time: '1 día ago' },
    { action: 'Calificó a', target: 'Cristiano Ronaldo', time: '2 días ago' }
  ];

  return (
    <Container className="py-4">
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="futstats-card text-center">
            <Card.Body>
              <div className="mb-3">
                <div className="avatar-placeholder bg-primary rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                     style={{width: '100px', height: '100px', fontSize: '2rem'}}>
                  <FaUser className="text-white" />
                </div>
              </div>
              <h3>VictorSaravia</h3>
              <p className="text-muted">@victorsaravia</p>
              <p className="text-muted mb-3">Miembro desde Enero 2025</p>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small>Reputación</small>
                  <small>{userStats.reputation}%</small>
                </div>
                <ProgressBar now={userStats.reputation} variant="primary" />
              </div>
              
              <Button variant="outline-primary" className="w-100">
                <FaEdit className="me-1" />
                Editar Perfil
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          {/* Estadísticas de Actividad */}
          <Card className="futstats-card mb-4">
            <Card.Header className="card-header-custom">
              <h5 className="mb-0">Mi Actividad</h5>
            </Card.Header>
            <Card.Body>
              <Row className="text-center">
                <Col md={4} className="mb-3">
                  <div className="stat-card">
                    <FaComment size="2rem" className="text-primary mb-2" />
                    <div className="stat-number">{userStats.comments}</div>
                    <div className="stat-label">Comentarios</div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="stat-card">
                    <FaUser size="2rem" className="text-success mb-2" />
                    <div className="stat-number">{userStats.playersFollowing}</div>
                    <div className="stat-label">Jugadores Siguiendo</div>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="stat-card">
                    <FaUsers size="2rem" className="text-info mb-2" />
                    <div className="stat-number">{userStats.teamsFollowing}</div>
                    <div className="stat-label">Equipos Siguiendo</div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          {/* Actividad Reciente */}
          <Card className="futstats-card">
            <Card.Header className="card-header-custom">
              <h5 className="mb-0">Actividad Reciente</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.map((activity, index) => (
                <div key={index} className="d-flex align-items-center py-2 border-bottom">
                  <div className="activity-icon me-3">
                    <FaStar className="text-warning" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold">
                      {activity.action} <span className="text-primary">{activity.target}</span>
                    </div>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              ))}
              <div className="text-center mt-3">
                <Button variant="outline-primary">
                  Ver Toda la Actividad
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;