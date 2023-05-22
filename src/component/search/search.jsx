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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "../../state/search/search-context.jsx";
import { useNavigate } from "react-router-dom";
import "./search.css";

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
  search: {
    backgroundColor: "white",
    border: "1px solid black",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      outline: "2px solid black",
      backgroundColor: "black",
      color: "white",
    },
  },
  formControl: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
  },
});

const searchOptions = [
  { label: "Title", value: "intitle" },
  { label: "Author", value: "inauthor" },
  { label: "Category", value: "subject" },
];

export const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [searchResults, setSearchResults] = useState(
    JSON.parse(localStorage.getItem("searchResults")) || []
  );
  const [clickedSearch, setClickedSearch] = useState(
    localStorage.getItem("clickedSearch") === "true"
  );
  const [searchType, setSearchType] = React.useState(
    localStorage.getItem("searchType") || searchOptions[0].value
  );
  const classes = useStyles();
  const [state, dispatch] = useContext(SearchContext);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption") || null
  );
  const [inputDisabled, setInputDisabled] = useState(searchType === "");
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showOnlyReviewed, setShowOnlyReviewed] = useState(false);

  async function getSearchResults(searchType, searchTerm, filter) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchType}:${searchTerm}`
    );
    const data = await response.json();
    let items = data.items;

    if (filter) {
      const storedReviews = localStorage.getItem("reviews")
        ? JSON.parse(localStorage.getItem("reviews"))
        : {};

      items = items.filter((book) => storedReviews[book.id]);
    }

    setSearchResults(items);
    setClickedSearch(true);
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    await getSearchResults(searchType, searchTerm, showOnlyReviewed);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchOptionChange = (event) => {
    const value = event.target.value;
    setSearchType(value);
    setSelectedOption(value);
    if (value === "") {
      setInputDisabled(true);
      setSearchResults([]);
      setClickedSearch(false);
      setSearchTerm("");
    } else {
      setInputDisabled(false);
    }
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

  const handleReadClick = (book) => {
    setSelectedBook(book);
    const readList = JSON.parse(localStorage.getItem("readList")) || [];
    readList.push(book);
    localStorage.setItem("readList", JSON.stringify(readList));
    navigate("/readList");
  };

  const handleShowOnlyReviewedChange = (event) => {
    setShowOnlyReviewed(event.target.checked);
  };

  useEffect(() => {
    localStorage.setItem("clickedSearch", clickedSearch);
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("searchType", searchType);
    localStorage.setItem("selectedOption", selectedOption);
  }, [clickedSearch, searchResults, searchTerm, searchType, selectedOption]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    localStorage.removeItem("clickedSearch");
    localStorage.removeItem("searchResults");
    localStorage.removeItem("searchTerm");
    localStorage.removeItem("searchType");
  };

  return (
    <div className="container">
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
                color="pink"
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                onChange={handleSearchOptionChange}
                label="Search By"
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
              label={
                searchTerm ? "Search Term" : "Choose an option to search by"
              }
              variant="outlined"
              value={searchTerm}
              placeholder={searchTerm ? "Enter search term" : "Search Term"}
              disabled={inputDisabled}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              className={classes.search}
              variant="contained"
              size="large"
              disableElevation
              onClick={handleSearch}
              disabled={searchType === ""}
              style={{ height: "55px" }}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlyReviewed}
                onChange={handleShowOnlyReviewedChange}
                name="showOnlyReviewed"
                color="black"
              />
            }
            label={
              <span style={{ fontSize: "1.2rem" }}>
                Show only books with reviews
              </span>
            }
          />
        </div>

        <br></br>
        <hr className="underline"></hr>
        <br></br>
        {clickedSearch &&
        searchResults.length === 0 &&
        searchTerm.trim() !== "" ? (
          <Typography
            variant="body1"
            color="error"
            style={{
              fontSize: "1.2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            No results found. Please try another search term or choose to view
            all books.
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
              Please enter a search term to find books
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
                  image={
                    book.volumeInfo?.imageLinks?.thumbnail ||
                    "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
                  }
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
