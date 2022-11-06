import { ListItem, Box } from "@mui/material";
import WordModal from "./wordModal";
import classes from "./word.module.css";
import { useState } from "react";

const Word = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        className={classes["word-wrapper"]}
        onClick={() => setOpen(true)}
      >
        <Box className={classes["word-item"]}>
          <div>
            <strong>{props.word}</strong>
          </div>
          {props.meanings.map((meaning) => {
            return (
              <p key={meaning.lexicalCategory}>
                ({meaning.lexicalCategory}) {meaning.definition}
              </p>
            );
          })}
        </Box>
      </ListItem>
      <WordModal
        word={props.word}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Word;
