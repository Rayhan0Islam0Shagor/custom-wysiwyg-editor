import React, { useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./App.css";
import TextEditor from "./TextEditor";
import { Button } from "@mui/material";

const App = () => {
  const [value, setValue] = useState("");

  const save = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    const filename = new Date().toLocaleString() + ".md";
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Box
      sx={{
        padding: "20px 0",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <TextEditor setValue={setValue} value={value} />

        <Button
          sx={{
            position: "absolute",
            bottom: "30px",
            right: "35px",
            zIndex: 100,
          }}
          variant="contained"
          color="primary"
          onClick={save}
        >
          Save
        </Button>
      </Container>
    </Box>
  );
};

export default App;
