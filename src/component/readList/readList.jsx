import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReadListContext } from "../../state/readList/readList-context";
import "./readList.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridOnIcon from "@mui/icons-material/GridOn";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";
import { ReadListActions } from "../../state/readList/readList.reducer";
import { useNavigate } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  CardActions,
  CardActionArea,
  Switch,
} from "@mui/material";

export const ReadList = () => {
  const location = useLocation();
  const book = location.state?.book;
  const [input, setInput] = useState("");
  const { readListState, readListDispatch } = useContext(ReadListContext);
  const [readList, setReadList] = useState([]);
  const username = localStorage.getItem("username");
  const [isGridView, setIsGridView] = useState(
    JSON.parse(localStorage.getItem("isGridView")) || false
  );

  const [isListToggleOn, setIsListToggleOn] = useState(false);
  const [isGridToggleOn, setIsGridToggleOn] = useState(false);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("readList")) || [];
    setReadList(list);
    const clearReadList = () => {
      localStorage.removeItem("readList");
    };
    window.addEventListener("beforeunload", clearReadList);

    return () => {
      window.removeEventListener("beforeunload", clearReadList);
    };
  }, []);

  useEffect(() => {}, [isListToggleOn, isGridToggleOn]);

  useEffect(() => {
    localStorage.setItem("isGridView", JSON.stringify(isGridView));
  }, [isGridView]);

  const deleteReadList = (id) => {
    const updatedReadList = readList.filter((book) => book.id !== id);
    localStorage.setItem("readList", JSON.stringify(updatedReadList));
    setReadList(updatedReadList);
  };

  const toggleChecked = (id) => {
    const updatedReadList = readList.map((book) => {
      if (book.id === id) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });

    if (isGridView) {
      setIsGridView(false);
      setIsListToggleOn(true);
      setIsGridToggleOn(false);
    } else {
      setIsGridView(true);
      setIsListToggleOn(false);
      setIsGridToggleOn(true);
    }

    localStorage.setItem("readList", JSON.stringify(updatedReadList));
    setReadList(updatedReadList);

    localStorage.setItem("isListToggleOn", isListToggleOn.toString());
    localStorage.setItem("isGridToggleOn", isGridToggleOn.toString());
    localStorage.setItem("isGridView", JSON.stringify(isGridView));
  };

  const handleReviewClick = (book) => {
    setSelectedBook(book);
    const storedReviews = localStorage.getItem("reviews")
      ? JSON.parse(localStorage.getItem("reviews"))
      : {};
    const reviews = storedReviews[book.id] || [];

    localStorage.setItem(
      "reviews",
      JSON.stringify({ ...storedReviews, [book.id]: reviews })
    );
    navigate("/review", { state: { book } });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const hasBooks = readList.length > 0;
  const chooseBookMessage = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Choose a book to add to your read list
      </Typography>
    </div>
  );

  return (
    <div className="container">
      <br />

      <Typography
        style={{
          textTransform: "uppercase",
          fontSize: "48px",
          textAlign: "center",
        }}
      >
        {username ? `${username}'s READ LIST` : "LOG IN TO"}
      </Typography>
      {hasBooks ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: "24px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                border: "2px solid black",
                borderRadius: "4px",
                position: "relative",
              }}
            >
              <IconButton
                color={isGridView ? "default" : "primary"}
                onClick={() => {
                  setIsGridView(false);
                  setIsListToggleOn(true);
                  setIsGridToggleOn(false);
                  localStorage.setItem("isGridView", "false");
                }}
                style={{
                  color: "black",
                  position: "relative",
                  transition: "all 0.2s",
                  zIndex: 2,
                  fontSize: "30px",
                }}
                className="list-icon-button"
              >
                <FormatListBulletedIcon style={{ fontSize: "40px" }} />
              </IconButton>

              <IconButton
                color={isGridView ? "primary" : "default"}
                onClick={() => {
                  setIsGridView(true);
                  setIsListToggleOn(false);
                  setIsGridToggleOn(true);
                  localStorage.setItem("isGridView", "true");
                }}
                style={{
                  color: "black",
                  position: "relative",
                  transition: "all 0.2s",
                  zIndex: 2,
                  fontSize: "30px",
                }}
                className="grid-icon-button"
              >
                <GridOnIcon style={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
          <hr className="underline"></hr>
          <br></br>

          {isGridView ? (
            <Grid container spacing={3}>
              {readList.map((book, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          book.volumeInfo.imageLinks?.thumbnail ||
                          "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
                        }
                        alt={book.volumeInfo.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {book.volumeInfo.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {book.volumeInfo.authors
                            ? book.volumeInfo.authors.join(", ")
                            : "Author Unknown"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {book.volumeInfo.publisher} -{" "}
                          {book.volumeInfo.publishedDate}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Box sx={{ ml: 1 }}>
                        <Checkbox
                          checked={book.isComplete}
                          onChange={() => toggleChecked(book.id)}
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          {...label}
                          className="my-checkbox"
                          sx={{
                            color: grey[500],
                            "&.Mui-checked": {
                              color: grey[500],
                            },
                            "&:hover": {
                              color: grey[500],
                            },
                          }}
                          checkedColor={grey[500]}
                        />
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <IconButton onClick={() => deleteReadList(book.id)}>
                          <ClearIcon />
                        </IconButton>
                      </Box>
                      <IconButton
                        size="medium"
                        sx={{
                          color: "black",
                          marginRight: "5px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        }}
                        onClick={() => handleReviewClick(book)}
                      >
                        <RateReviewIcon />
                      </IconButton>

                      <Button
                        size="small"
                        color="primary"
                        sx={{
                          color: "black",
                          outline: "1px solid black",
                          margin: "0 8px",
                          backgroundColor: "white",
                          borderRadius: "10%",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                        onClick={() => window.open(book.volumeInfo.previewLink)}
                      >
                        Read
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                border: "2px solid black",
                borderRadius: "7px",
                width: "70%",
                margin: "0 auto",
              }}
            >
              <List>
                {readList.map((book) => (
                  <ListItem key={book.id}>
                    <Card sx={{ width: "100%" }}>
                      <CardActionArea>
                        <Grid container spacing={2}>
                          <Grid item>
                            <CardMedia
                              component="img"
                              sx={{ width: 80 }}
                              image={
                                book.volumeInfo.imageLinks?.thumbnail ||
                                "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
                              }
                              alt={book.volumeInfo.title}
                            />
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <ListItemText
                                  primary={
                                    <Typography
                                      variant="subtitle1"
                                      fontWeight="bold"
                                      style={{ textTransform: "uppercase" }}
                                    >
                                      {book.volumeInfo.title}
                                    </Typography>
                                  }
                                  secondary={`by ${book.volumeInfo.authors?.join(
                                    ", "
                                  )}`}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  {`Published by ${book.volumeInfo.publisher} on ${book.volumeInfo.publishedDate}`}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <CardActions>
                                <Checkbox
                                  checked={book.isComplete}
                                  onChange={() => toggleChecked(book.id)}
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  {...label}
                                  className="my-checkbox"
                                  sx={{
                                    color: grey[500],
                                    "&.Mui-checked": {
                                      color: grey[500],
                                    },
                                    "&:hover": {
                                      color: grey[500],
                                    },
                                  }}
                                  checkedColor={grey[500]}
                                />
                                <IconButton
                                  onClick={() => deleteReadList(book.id)}
                                >
                                  <ClearIcon />
                                </IconButton>
                                <IconButton
                                  size="medium"
                                  sx={{
                                    color: "black",
                                    marginRight: "5px",
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    boxShadow:
                                      "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                  }}
                                  onClick={() => handleReviewClick(book)}
                                >
                                  <RateReviewIcon />
                                </IconButton>

                                <Button
                                  size="small"
                                  color="primary"
                                  sx={{
                                    color: "black",
                                    outline: "1px solid black",
                                    margin: "0 8px",
                                    backgroundColor: "white",
                                    borderRadius: "10%",
                                    boxShadow:
                                      "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                    "&:hover": {
                                      backgroundColor: "black",
                                      color: "white",
                                    },
                                  }}
                                  onClick={() =>
                                    window.open(book.volumeInfo.previewLink)
                                  }
                                >
                                  Read
                                </Button>
                              </CardActions>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </>
      ) : (
        chooseBookMessage
      )}
    </div>
  );
};
