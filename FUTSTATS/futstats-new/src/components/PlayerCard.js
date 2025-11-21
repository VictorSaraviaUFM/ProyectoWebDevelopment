// PlayerCard.js
import React from "react";
import { Card } from "react-bootstrap";
import { FaFutbol, FaStar } from "react-icons/fa";

const PlayerCard = ({ player }) => {
  return (
    <Card className="futstats-card player-card shadow-sm mb-3">
      <Card.Body className="d-flex align-items-center">
        <div className="player-photo me-3">
          <img
            src={player.photo}
            alt={player.name}
            className="rounded-circle"
            width="64"
            height="64"
          />
        </div>
        <div className="flex-grow-1">
          <div className="fw-bold fs-5">{player.name}</div>
          <div className="text-muted small">{player.team}</div>
          <div className="small mt-1">
            ⚽ {player.goals} &nbsp;•&nbsp; 🎯 {player.assists}
          </div>
        </div>
        <div className="player-rating-circle ms-3">
          {player.rating}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
