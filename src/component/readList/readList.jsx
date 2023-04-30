// import React, { useState, useContext } from "react";
// import "./readList.css";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import Checkbox from "@mui/material/Checkbox";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { purple } from "@mui/material/colors";
// import { ReadListContext } from "../../state/readList/readList-context";
// import { ReadListActions } from "../../state/readList/readList.reducer";
// import Typography from "@material-ui/core/Typography";

// export const ReadList = () => {
//   const [input, setInput] = useState("");
//   const { readListState, readListDispatch } = useContext(ReadListContext);
//   const username = localStorage.getItem("username");

//   const onInput = (event) => {
//     console.log(event.target.value);
//     setInput(event.target.value);
//   };

//   const addReadList = () => {
//     readListDispatch({
//       type: ReadListActions.ADD,
//       readList: { title: input, isComplete: false },
//     });
//     setInput("");
//   };

//   const deleteReadList = (readList) => {
//     readListDispatch({
//       type: ReadListActions.DELETE,
//       readList,
//     });
//   };

//   const toggleChecked = (readList) => {
//     readListDispatch({ type: ReadList.TOGGLE, readList });
//   };
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };

//   return (
//     <div className="full">
//       <br></br>
//       <Typography style={{ textTransform: "uppercase" }}>
//         {username}'s READ LIST
//       </Typography>

//       <div className="box">
//         <Box
//           component="form"
//           sx={{
//             "& > :not(style)": { m: 1, width: "25ch" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <TextField
//             id="standard-basic"
//             label="Enter a Task"
//             defaultValue="Enter a Task"
//             variant="standard"
//             onInput={onInput}
//             value={input}
//             color="secondary"
//           />

//           <div className="addButton">
//             <IconButton onClick={addReadList} edge="end" color="secondary">
//               <AddIcon />
//             </IconButton>
//           </div>
//         </Box>
//       </div>
//       <br></br>
//       <div className="tasks">
//         {readListState.readLists.map((readList, index) => (
//           <p
//             key={index}
//             index={index}
//             deleteReadList={deleteReadList}
//             draggable
//           >
//             <Checkbox
//               {...label}
//               icon={<CheckCircleOutlineIcon />}
//               checkedIcon={<CheckCircleIcon />}
//               checked={readList.isComplete}
//               onChange={() => toggleChecked(readList)}
//               sx={{
//                 color: purple[800],
//                 "&.Mui-checked": {
//                   color: purple[600],
//                 },
//               }}
//             />

//             <IconButton
//               onClick={() => deleteReadList(index)}
//               edge="start"
//               color="secondary"
//             >
//               <DeleteOutlineIcon />
//             </IconButton>

//             {readList.title}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReadListContext } from "../../state/readList/readList-context";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";

export const ReadList = () => {
  const location = useLocation();
  const book = location.state?.book;

  const [readText, setReadText] = useState("");
  const [readLists, setReadList] = useState([]);
  const username = localStorage.getItem("username");
  const { readListState, readListDispatch } = useContext(ReadListContext);

  useEffect(() => {
    const storedReadLists = localStorage.getItem("readList");
    if (storedReadLists) {
      setReadList(JSON.parse(storedReadLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readList", JSON.stringify(readLists));
  }, [readLists]);

  const handleReadListsSubmit = (event) => {
    event.preventDefault();
    if (readText.trim() !== "") {
      setReadList([...readLists, readText]);
      setReadText("");
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
        <Typography style={{ textTransform: "uppercase" }}>
          {username}'s READ LIST
        </Typography>
        <br></br>
        <br></br>
        <Typography variant="h4">
          Choose a book to add to your read list
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography style={{ textTransform: "uppercase" }}>
        {username}'s READ LIST
      </Typography>

      <Card sx={{ maxWidth: 600, margin: "auto", marginTop: 10 }}>
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
      {/* <form onSubmit={handleReadListsSubmit}>
        <TextField
          label="Write your review here..."
          variant="outlined"
          fullWidth
          margin="normal"
          value={readText}
          onChange={(event) => setReadText(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form> */}
      <List>
        {readLists.map((readList, index) => (
          <ListItem key={index}>
            <Typography>{readLists}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
