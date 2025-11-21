import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommentBox from "../components/CommentBox";
import CommentList from "../components/CommentList";

function Comments() {
  const [comments, setComments] = useState([]);

  function addComment(newComment) {
    setComments([...comments, newComment]);
  }

  return (
    <div>
      <Navbar />

      <h1>Opiniones de la Comunidad</h1>
      <p>Comparte tu análisis y debate de manera respetuosa.</p>

      <CommentBox onSubmit={addComment} />

      <CommentList comments={comments} />

      <Footer />
    </div>
  );
}

export default Comments;
