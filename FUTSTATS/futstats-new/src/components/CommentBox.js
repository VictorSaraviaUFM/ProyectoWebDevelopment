import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function CommentBox({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="commentBox">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Escribe tu opinión futbolera..."
          className="bg-dark text-light border-secondary"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>

      <Button
        type="submit"
        className="mt-2"
        variant="primary"
        style={{ backgroundColor: "#0d6efd" }}
      >
        Publicar
      </Button>
    </Form>
  );
}
