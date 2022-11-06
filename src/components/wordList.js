import { List, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddWord from "./addWord";
import Word from "./word";
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./addWord.module.css";

const WordList = (props) => {
  const [words, setWords] = useState(null);
  const [addWordModalOpen, setAddWordModalOpen] = useState(false);

  const fetchWords = async () => {
    const response = await axios.get("http://localhost:8080/words");
    const data = response.data;
    setWords(data.words);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <>
      <List>
        {words &&
          words.map((ele) => {
            const meanings = [];
            for (let sense of ele.senses) {
              meanings.push({
                lexicalCategory: sense.lexicalCategory,
                definition: sense.meanings[0].definition,
              });
            }

            return <Word word={ele.word} meanings={meanings} key={ele.word} />;
          })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          setAddWordModalOpen(true);
        }}
        className={classes["floating-btn"]}
      >
        <AddIcon />
      </Fab>
      <AddWord
        open={addWordModalOpen}
        handleClose={() => {
          setAddWordModalOpen(false);
        }}
        onAddWord={fetchWords}
      />
    </>
  );
};

export default WordList;
