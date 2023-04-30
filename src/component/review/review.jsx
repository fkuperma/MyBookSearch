import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";

export const Review = () => {
  const location = useLocation();
  const book = location.state?.book;

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewText.trim() !== "") {
      setReviews([...reviews, reviewText]);
      setReviewText("");
    }
  };

  if (!book) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h4">
          Choose a book to see or write reviews
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 10 }}>
        <CardMedia
          component="img"
          height="400"
          image={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {book.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Author Unknown"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {book.volumeInfo.publisher} - {book.volumeInfo.publishedDate}
          </Typography>
        </CardContent>
      </Card>
      <form onSubmit={handleReviewSubmit}>
        <TextField
          label="Write your review here..."
          variant="outlined"
          fullWidth
          margin="normal"
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <List>
        {reviews.map((review, index) => (
          <ListItem key={index}>
            <Typography>{review}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
