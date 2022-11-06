import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
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
  maxHeight: "50vh",
  overflow: "scroll",
};

const WordModal = (props) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get(
        `http://localhost:8080/words/${props.word}`
      );
      const data = response.data;
      setInfo(data);
      console.log(data);
    };
    fetchInfo();
  }, [props.word]);

  return (
    <Modal open={props.open} onBackdropClick={props.handleClose}>
      <Box sx={style}>
        <Button onClick={props.handleClose}>
          <CloseIcon />
        </Button>
        {info && (
          <div>
            <strong>{info.word}</strong>
            <div style={{ color: "#0f0f0f" }}>{info.etymologies[0]}</div>
            <div>
              {info.senses.map((element) => {
                return (
                  <div>
                    <span style={{ color: "#0f0f0f" }}>
                      {element.lexicalCategory}
                    </span>
                    {element.meanings.map((m) => {
                      return (
                        <p>
                          {m.definition}
                          <ul>
                            {m.examples.map((example) => {
                              return <li>{example}</li>;
                            })}
                          </ul>
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default WordModal;
