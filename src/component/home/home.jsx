import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import "./home.css";
import { useNavigate } from "react-router-dom";

const quotes = [
  {
    quote:
      "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
    image: "https://source.unsplash.com/500x300/?books",
  },
  {
    quote:
      "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one.",
    author: "George R.R. Martin",
    image: "https://source.unsplash.com/500x300/?reading",
  },
  {
    quote: "I have always imagined that Paradise will be a kind of library.",
    author: "Jorge Luis Borges",
    image: "https://source.unsplash.com/500x300/?palace",
  },
  {
    quote:
      "You can never get a cup of tea large enough or a book long enough to suit me.",
    author: "C.S. Lewis",
    image: "https://source.unsplash.com/500x300/?tea",
  },
  {
    quote:
      "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
    author: "Jane Austen",
    image: "https://source.unsplash.com/500x300/?novel",
  },
  {
    quote: "If you don't like to read, you haven't found the right book.",
    author: "J.K. Rowling",
    image: "https://source.unsplash.com/500x300/?book",
  },
  {
    quote:
      "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.",
    author: "Charles W. Eliot",
    image: "https://source.unsplash.com/500x300/?library",
  },
  {
    quote: "Reading is a basic tool in the living of a good life.",
    author: "Mortimer J. Adler",
    image: "https://source.unsplash.com/500x300/?school",
  },
  {
    quote: "There is no friend as loyal as a book.",
    author: "Ernest Hemingway",
    image: "https://source.unsplash.com/500x300/?beach",
  },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: "auto",
    maxWidth: 1400,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 60,
    border: "1px solid black",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      outline: "2px solid black",
      backgroundColor: "black",
      color: "white",
    },
  },
  loginDialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginButton: {
    marginTop: 10,
  },
});

export const LoginPrompt = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLoginClick = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleOKClick = () => {
    localStorage.setItem("username", username);
    navigate("/readList");
  };

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div>
      <Paper className={classes.paper} onClick={handleLoginClick}>
        Log In
      </Paper>
      <Dialog open={open} onClose={handleLoginClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent className={classes.loginDialog}>
          <TextField
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            onClick={handleOKClick}
          >
            OK
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "100px",
        }}
      >
        <LoginPrompt />
      </div>
      <Grid container spacing={3}>
        {quotes.map((quote, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={quote.image}
                title="Book Image"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {quote.quote}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {quote.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
