import { Modal, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddWord = (props) => {
  const [inputWord, setInputWord] = useState("");

  const inputChangeHandler = (event) => {
    setInputWord(event.target.value);
  };

  const btnClickHandler = async (event) => {
    if (inputWord.length === 0) {
      return;
    }

    const response = await axios({
      method: "post",
      url: "http://localhost:8080/words",
      data: {
        word_id: inputWord,
      },
    });
    const data = response.data;

    if (!data.hasOwnProperty("word")) {
      alert("Cannot add word");
      return;
    }

    props.onAddWord();

    props.handleClose();
  };

  return (
    <Modal open={props.open} onBackdropClick={props.handleClose}>
      <Box sx={style}>
        <h3>Add to Dictionary</h3>
        <TextField
          id="standard-basic"
          label="new-word"
          variant="standard"
          value={inputWord}
          onChange={inputChangeHandler}
        />
        <Button onClick={props.handleClose}>CANCEL</Button>
        <Button onClick={btnClickHandler}>ADD</Button>
      </Box>
    </Modal>
  );
};

export default AddWord;
