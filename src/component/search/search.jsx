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
  useEffect(() => {
    localStorage.setItem("clickedSearch", clickedSearch);
  }, [clickedSearch]);

  return (
    <div>
      <Typography variant="h4">Book Search</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="search-type-label">Search By</InputLabel>
            <Select
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
            label={searchTerm ? "Search Term" : "Choose an option to search by"}
            variant="outlined"
            value={searchTerm}
            placeholder={searchTerm ? "Enter search term" : "Search Term"}
            disabled={inputDisabled}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2} lg={1}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
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
      ) : (
        searchTerm.trim() === "" && (
          <Typography variant="body1" color="error">
            Please enter a search term to find books.
          </Typography>
        )
      )}

      <Grid container spacing={3}>
        {searchResults.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              key={book.id}
              className={classes.root}
              onClick={() => window.open(book.volumeInfo.previewLink)}
            >
              <CardActionArea>
                <CardMedia
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
                    size="small"
                    sx={{
                      color: "black",
                    }}
                  >
                    <RateReviewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "black",
                    }}
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
