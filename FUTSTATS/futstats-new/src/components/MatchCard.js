import React from "react";
import Card from "react-bootstrap/Card";


export default function MatchCard({ match }) {
  if (!match) return null;

  return (
    <Card className="mb-3 p-2 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold">{match.league || "Liga desconocida"}</span>
          <small className="text-muted">{match.date}</small>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="text-center flex-grow-1">
            <div className="fw-bold">{match.homeTeam}</div>
            <div className="display-6 fw-bold">{match.homeScore ?? "-"}</div>
          </div>

          <div className="mx-3 fs-4 fw-bold">vs</div>

          <div className="text-center flex-grow-1">
            <div className="fw-bold">{match.awayTeam}</div>
            <div className="display-6 fw-bold">{match.awayScore ?? "-"}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}