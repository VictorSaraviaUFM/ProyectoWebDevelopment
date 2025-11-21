import { Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function OpinionCard({ opinion, onDelete }) {
  return (
    <Card className="mb-3 bg-dark text-light p-3 shadow-sm border-secondary">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <strong>@{opinion.user}</strong>
          <p className="mb-1 mt-1">{opinion.text}</p>
          <small className="text-muted">{opinion.date}</small>
        </div>

        {onDelete && (
          <FaTrash
            role="button"
            className="text-danger ms-3"
            onClick={() => onDelete(opinion._id)}
          />
        )}
      </div>
    </Card>
  );
}
