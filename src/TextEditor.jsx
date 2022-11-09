import React, { useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import * as FaIcons from "react-icons/fa";

import { Editor } from "@toast-ui/react-editor";

const TextEditor = ({ value, setValue }) => {
  console.log("🚀 ~ file: TextEditor.jsx ~ line 8 ~ TextEditor ~ value", value);
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current.getInstance();
    const editorEl = editor.getMarkdown();
    const images = [];
    const imagesFromMarkdown = editorEl.match(/!\[.*?\]\(.*?\)/g);

    if (imagesFromMarkdown) {
      imagesFromMarkdown.forEach((image) => {
        const imageSrc = image.match(/\(.*?\)/g)[0].slice(1, -1);
        const newImageStr = `[${image}](${imageSrc})`;

        images.push(newImageStr);
      });
    }

    const newValue = value.match(/!\[.*?\]\(.*?\)/g);

    if (newValue) {
      newValue.forEach((image) => {
        const imageSrc = image.match(/\(.*?\)/g)[0].slice(1, -1);

        images.forEach((newImage) => {
          const newImageSrc = newImage.match(/\(.*?\)/g)[0].slice(1, -1);

          if (imageSrc === newImageSrc) {
            setValue((prev) => prev.replace(image, newImage));
          }
        });
      });
    }
  }, []);

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
          top: "9px",
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
