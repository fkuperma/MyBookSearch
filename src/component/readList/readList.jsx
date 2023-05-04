import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReadListContext } from "../../state/readList/readList-context";
import "./readList.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridOnIcon from "@mui/icons-material/GridOn";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";

import { ReadListActions } from "../../state/readList/readList.reducer";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
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
  const [isGridView, setIsGridView] = useState(false);
  const [isListToggleOn, setIsListToggleOn] = useState(false);
  const [isGridToggleOn, setIsGridToggleOn] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("readList")) || [];
    setReadList(list);
    const clearReadList = () => {
      localStorage.removeItem("readList");
    };
    window.addEventListener("beforeunload", clearReadList);

    const isListToggleOn = localStorage.getItem("isListToggleOn");
    if (isListToggleOn !== null) {
      setIsListToggleOn(isListToggleOn === "true");
    }

    const isGridToggleOn = localStorage.getItem("isGridToggleOn");
    if (isGridToggleOn !== null) {
      setIsGridToggleOn(isGridToggleOn === "true");
    }

    return () => {
      window.removeEventListener("beforeunload", clearReadList);
    };
  }, []);

  // const onInput = (event) => {
  //   console.log(event.target.value);
  //   setInput(event.target.value);
  // };

  // const addReadList = () => {
  //   const newBook = {
  //     title: book.volumeInfo.title,
  //     image: book.volumeInfo.imageLinks.thumbnail,
  //     isComplete: false,
  //   };
  //   readListDispatch({
  //     type: ReadListActions.ADD,
  //     readList: newBook,
  //   });
  //   setInput("");
  // };

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
    localStorage.setItem("readList", JSON.stringify(updatedReadList));
    setReadList(updatedReadList);

    if (isListToggleOn) {
      localStorage.setItem("isListToggleOn", "true");
      localStorage.setItem("isGridToggleOn", "false");
    } else if (isGridToggleOn) {
      localStorage.setItem("isListToggleOn", "false");
      localStorage.setItem("isGridToggleOn", "true");
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const hasBooks = readList.length > 0;
  const chooseBookMessage = (
    <Typography variant="h4" style={{ textAlign: "center" }}>
      Choose a book to add to your read list
    </Typography>
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
        {username ? `${username}'s READ LIST` : "READ LIST"}
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
                onClick={() => setIsGridView(false)}
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
              <span
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  width: "1px",
                  height: "100%",
                  backgroundColor: "black",
                  transform: "translate(-50%)",
                  zIndex: 1,
                  content: '""',
                }}
              />
              <IconButton
                color={isGridView ? "primary" : "default"}
                onClick={() => setIsGridView(true)}
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
                        image={book.volumeInfo.imageLinks.thumbnail}
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
                              image={book.volumeInfo.imageLinks?.thumbnail}
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
