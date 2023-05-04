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
    <div className="container">
      <Box
        sx={{
          border: "2px solid black",
          padding: 2,
          maxWidth: 600,
          margin: "auto",
          marginTop: 7,
        }}
      >
        <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 0 }}>
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
        <List>
          {reviews.map((review, index) => (
            <Card
              key={index}
              sx={{ maxWidth: 600, margin: "auto", marginTop: 0.5 }}
            >
              <ListItem>
                <Typography>
                  <strong>{username}</strong> : {review}
                </Typography>
              </ListItem>
            </Card>
          ))}
        </List>
        <form onSubmit={handleReviewSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: 600,
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
                maxWidth: 600,
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
    </div>
  );
};
