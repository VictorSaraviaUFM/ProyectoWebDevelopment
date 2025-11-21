import OpinionCard from "./OpinionCard";

export default function CommentList({ opinions, onDelete }) {
  return (
    <div>
      {opinions.length === 0 ? (
        <p className="text-muted">No hay opiniones todavía. ¡Sé el primero en comentar!</p>
      ) : (
        opinions.map((opinion) => (
          <OpinionCard
            key={opinion._id}
            opinion={opinion}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
