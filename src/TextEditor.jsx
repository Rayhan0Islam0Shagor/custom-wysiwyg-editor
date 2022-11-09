import React, { useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import * as FaIcons from "react-icons/fa";

import { Editor } from "@toast-ui/react-editor";

const TextEditor = ({ value, setValue }) => {
  const editorRef = useRef(null);

  useEffect(() => {}, [value]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Editor
        placeholder="Write here..."
        initialValue={value}
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        onChange={() => {
          setValue(editorRef.current.getInstance().getMarkdown());
        }}
        hideModeSwitch={true}
      />

      <Box
        sx={{
          position: "absolute",
          top: "5px",
          right: {
            xs: "5px",
            md: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            gap: "10px",
          }}
        >
          <IconButton
            className="undo-redo-btn"
            onClick={() => editorRef.current.getInstance().exec("undo")}
          >
            <FaIcons.FaUndo />
          </IconButton>

          <IconButton
            className="undo-redo-btn"
            onClick={() => editorRef.current.getInstance().exec("redo")}
          >
            <FaIcons.FaRedo />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TextEditor;
