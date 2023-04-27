//Fraidy Kuperman
import React from "react";
import { Card } from "@material-ui/core";
import { useState } from "react";

export const Review = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  return (
    <div>
      <h1>Review Page</h1>
      {selectedBook && (
        <Card style={{ width: "30rem" }}>
          <Card.Img variant="top" src={selectedBook.image} />
          <Card.Body>
            <Card.Title>{selectedBook.title}</Card.Title>
            <Card.Text>{selectedBook.author}</Card.Text>
            <Card.Text>{selectedBook.description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
