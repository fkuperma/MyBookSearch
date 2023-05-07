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
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import "./review.css";

export const Review = () => {
  const location = useLocation();
  const book = location.state?.book;

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (book && book.id) {
      const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
      const bookReviews = storedReviews[book.id] || [];
      setReviews(bookReviews);
    }
  }, [book]);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewText.trim() !== "") {
      setReviews([...reviews, { username, reviewText }]);
      setReviewText("");

      const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
      const bookReviews = storedReviews[book.id] || [];
      localStorage.setItem(
        "reviews",
        JSON.stringify({
          ...storedReviews,
          [book.id]: [...bookReviews, { username, reviewText }],
        })
      );
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
    <div className="container">
      <Box
        sx={{
          border: "2px solid black",
          padding: 2,
          maxWidth: "1000 !important",
          margin: "auto",
          width: "45%",
          marginTop: 7,
        }}
      >
        <Card sx={{ maxWidth: "500 !important", margin: "auto", marginTop: 0 }}>
          <CardMedia
            component="img"
            height="500"
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
        {reviews.length > 0 && (
          <List>
            {reviews.map((review, index) => (
              <Card
                key={index}
                sx={{ maxWidth: 1000, margin: "auto", marginTop: 0.5 }}
              >
                <ListItem>
                  <Typography>
                    <strong>{review.username}</strong> : {review.reviewText}
                  </Typography>
                </ListItem>
              </Card>
            ))}
          </List>
        )}

        <form onSubmit={handleReviewSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: 900,
              margin: "auto",
              marginTop: 2,
              position: "relative",
            }}
          >
            <TextField
              label="Write your review here..."
              variant="outlined"
              fullWidth
              margin="normal"
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              sx={{
                width: "100%",
                maxWidth: "100%",
                margin: "auto",
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "black",
                  },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "black",
                },
              }}
              multiline
              rows={4}
              InputProps={{
                style: {
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                },
                endAdornment: (
                  <IconButton
                    type="submit"
                    edge="end"
                    color="secondary"
                    size="large"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      height: "55px",
                      marginRight: "2px",
                      bgcolor: buttonClicked ? "#000" : "",
                      color: buttonClicked ? "#fff" : "#000",
                      "&:hover": {
                        bgcolor: "transparent",
                        border: "1px solid black",
                        bgcolor: "black",
                        color: "white",
                      },
                      "&:active": {
                        bgcolor: buttonClicked ? "#000" : "",
                      },
                    }}
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                    onMouseDown={() => setButtonClicked(true)}
                    onMouseUp={() => setButtonClicked(false)}
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </form>
      </Box>
      <br></br>
    </div>
  );
};
