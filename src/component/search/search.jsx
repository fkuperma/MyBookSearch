import * as React from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../state/search/search-context.jsx";
import { useNavigate } from "react-router-dom";
import { Review } from "../review/review";
import { ReadList } from "../readList/readList";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 240,
    outline: "2px solid black",
    boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.5)",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  formControl: {
    minWidth: "100%",
  },
  inputRoot: {
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    border: "1px solid #000000",
  },
  inputFocused: {
    border: "1px solid #000000",
  },
  notchedOutline: {
    border: "none",
  },
});

const searchOptions = [
  { label: "Title", value: "intitle" },
  { label: "Author", value: "inauthor" },
  { label: "Category", value: "subject" },
];

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clickedSearch, setClickedSearch] = useState(
    localStorage.getItem("clickedSearch") === "true"
  );
  const [searchType, setSearchType] = React.useState(searchOptions[0].value);
  const classes = useStyles();
  const [state, dispatch] = useContext(SearchContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(true);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

  async function getSearchResults(searchType, searchTerm) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchType}:${searchTerm}`
    );
    const data = await response.json();
    setSearchResults(data.items);
    setClickedSearch(true);
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    await getSearchResults(searchType, searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearchOptionChange = (event) => {
    setInputDisabled(false);
    setSearchResults([]);
    setClickedSearch(false);
    setSearchTerm("");
    setSearchType(event.target.value);
  };

  const handleReviewClick = (book) => {
    setSelectedBook(book);
    navigate("/review", { state: { book } });
  };

  const handleReadClick = (book) => {
    setSelectedBook(book);
    navigate("/readList", { state: { book } });
  };

  useEffect(() => {
    localStorage.setItem("clickedSearch", clickedSearch);
  }, [clickedSearch]);

  return (
    <div>
      {/* <Typography variant="h4">Book Search</Typography> */}
      <div>
        <br />
        <br />
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="search-type-label">Search By</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                onChange={handleSearchOptionChange}
                label="Search By"
                classes={{
                  root: classes.inputRoot,
                  focused: classes.inputFocused,
                }}
              >
                {searchOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              id="search-term"
              label={searchTerm ? "Search Term" : "Choose option to search"}
              variant="outlined"
              value={searchTerm}
              placeholder={searchTerm ? "Enter search term" : "Search Term"}
              disabled={inputDisabled}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{
                classes: {
                  root: classes.inputRoot,
                  focused: classes.inputFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="contained"
              color="black"
              size="large"
              disableElevation
              onClick={handleSearch}
              style={{ height: "55px" }}
              fullWidth
              classes={{
                root: classes.inputRoot,
                focused: classes.inputFocused,
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {clickedSearch &&
        searchResults.length === 0 &&
        searchTerm.trim() !== "" ? (
          <Typography variant="body1" color="error">
            No results found. Please try another search term.
          </Typography>
        ) : searchTerm.trim() === "" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Typography variant="h4">
              Please enter a Search Term to find books
            </Typography>
          </div>
        ) : null}
      </div>
      <Grid container spacing={3}>
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <br></br>
            <Card key={book.id} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  onClick={() => window.open(book.volumeInfo.previewLink)}
                  className={classes.media}
                  image={book.volumeInfo?.imageLinks?.thumbnail || ""}
                  title={book.volumeInfo?.title || ""}
                />{" "}
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
              <CardActions className={classes.cardActions}>
                <div />
                <div className={classes.iconsContainer}>
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
                  <IconButton
                    size="medium"
                    sx={{
                      color: "black",
                      margin: "0 8px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    onClick={() => handleReadClick(book)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
