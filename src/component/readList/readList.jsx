import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReadListContext } from "../../state/readList/readList-context";
import "./readList.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { purple } from "@mui/material/colors";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridOnIcon from "@mui/icons-material/GridOn";

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

  const deleteReadList = (title) => {
    readListDispatch({
      type: ReadListActions.DELETE,
      title,
    });
  };

  const toggleChecked = (title) => {
    readListDispatch({
      type: ReadListActions.TOGGLE,
      title,
    });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const hasBooks = readList.length > 0;
  const chooseBookMessage = (
    <Typography variant="h4" style={{ textAlign: "center" }}>
      Choose a book to add to your read list
    </Typography>
  );

  return (
    <div>
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
              fontSize: "24px",
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

          {isGridView ? (
            <Grid container spacing={3}>
              {readList.map((title, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={title.title}>
                  <Card>
                    <br></br>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        // image={title.volumeInfo.imageLinks.thumbnail}
                        image={`https://source.unsplash.com/featured/?${title.title}`}
                        alt={title.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Author
                          {/* {book.volumeInfo.authors
                            ? book.volumeInfo.authors.join(", ")
                            : "Author Unknown"} */}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Publisher 01-02-2023
                          {/* {book.volumeInfo.publisher} -{" "}
                          {book.volumeInfo.publishedDate} */}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
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
            <List>
              {readList.map((title, index) => (
                <ListItem
                  key={title.title}
                  index={index}
                  deleteReadList={() => deleteReadList(title)}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      {...label}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      checked={title.isComplete}
                      onChange={() => toggleChecked(title)}
                      sx={{
                        color: purple[800],
                        "&.Mui-checked": {
                          color: purple[600],
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => deleteReadList(index)}
                      edge="start"
                      color="secondary"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <ListItemText primary={title} />
                    {/* <ListItemText primary={`Book title: ${title}`} /> */}
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
                      }}
                      // onClick={() => window.open(book.volumeInfo.previewLink)}
                    >
                      Read
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </>
      ) : (
        chooseBookMessage
      )}
    </div>
  );
};
