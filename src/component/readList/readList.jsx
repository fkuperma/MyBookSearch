import React, { useState, useContext } from "react";
import "./readList.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { purple } from "@mui/material/colors";
import { ReadListContext } from "../../state/readList/readList-context";
import { ReadListActions } from "../../state/readList/readList.reducer";

export const ReadList = () => {
  const [input, setInput] = useState("");
  const { readListState, readListDispatch } = useContext(ReadListContext);

  const onInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const addReadList = () => {
    readListDispatch({
      type: ReadListActions.ADD,
      readList: { title: input, isComplete: false },
    });
    setInput("");
  };

  const deleteReadList = (readList) => {
    readListDispatch({
      type: ReadListActions.DELETE,
      readList,
    });
  };

  const toggleChecked = (readList) => {
    readListDispatch({ type: ReadList.TOGGLE, readList });
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="full">
      <br></br>
      <h1>MY READ LIST </h1>
      <div className="box">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Enter a Task"
            defaultValue="Enter a Task"
            variant="standard"
            onInput={onInput}
            value={input}
            color="secondary"
          />

          <div className="addButton">
            <IconButton onClick={addReadList} edge="end" color="secondary">
              <AddIcon />
            </IconButton>
          </div>
        </Box>
      </div>
      <br></br>
      <div className="tasks">
        {readListState.readLists.map((readList, index) => (
          <p
            key={index}
            index={index}
            deleteReadList={deleteReadList}
            draggable
          >
            <Checkbox
              {...label}
              icon={<CheckCircleOutlineIcon />}
              checkedIcon={<CheckCircleIcon />}
              checked={readList.isComplete}
              onChange={() => toggleChecked(readList)}
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

            {readList.title}
          </p>
        ))}
      </div>
    </div>
  );
};
