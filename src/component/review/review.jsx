import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { SearchContext } from "../../state/search/search-context";

export const Review = () => {
  //   const { book } = useContext(SearchContext);
  //   const [error, setError] = useState(false);

  //   const handleBack = () => {
  //     window.history.back();
  //   };

  //   if (!book) {
  //     setError(true);
  //     return (
  //       <Typography variant="body1" color="error">
  //         Error: No book found. Please go back and try again.
  //       </Typography>
  //     );
  //   }

  return (
    <>
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
      <Card>
        {/* <CardMedia
          component="img"
          height="400"
          image={book.volumeInfo?.imageLinks?.thumbnail || ""}
          alt={book.volumeInfo?.title || ""}
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
          <Typography variant="body1" color="textPrimary" component="p">
            {book.volumeInfo.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <RateReviewIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    </>
  );
};
