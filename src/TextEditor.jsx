import React, { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import * as FaIcons from "react-icons/fa";

import { Editor } from "@toast-ui/react-editor";

const TextEditor = ({ value, setValue }) => {
  const editorRef = useRef(null);

  const handleChange = () => {
    let editorEl = editorRef?.current?.getInstance()?.getMarkdown();
    const imagesFromMarkdown = editorEl?.match(/!\[.*?\]\(.*?\)/g);

    if (imagesFromMarkdown) {
      imagesFromMarkdown.forEach((image) => {
        const imageSrc = image.match(/\(.*?\)/g)[0].slice(1, -1);
        const newImageStr = `[${image}](${imageSrc})`;
        editorEl = editorEl.replace(image, newImageStr);
        setValue(editorEl);
      });
    } else {
      setValue(editorEl);
    }
  };

  // const editor = editorRef?.current?.getInstance();
  // const editorEl = editor?.getMarkdown();

  // useEffect(() => {
  //   const images = [];
  //   const imagesFromMarkdown = editorEl?.match(/!\[.*?\]\(.*?\)/g);

  //   if (imagesFromMarkdown) {
  //     imagesFromMarkdown.forEach((image) => {
  //       const imageSrc = image.match(/\(.*?\)/g)[0].slice(1, -1);
  //       const newImageStr = `[${image}](${imageSrc})`;

  //       images.push(newImageStr);
  //     });
  //   }

  //   const newValue = value.match(/!\[.*?\]\(.*?\)/g);

  //   if (newValue) {
  //     newValue.forEach((image) => {
  //       const imageSrc = image.match(/\(.*?\)/g)[0].slice(1, -1);

  //       images.forEach((newImage) => {
  //         const newImageSrc = newImage.match(/\(.*?\)/g)[0].slice(1, -1);

  //         if (imageSrc === newImageSrc) {
  //           setValue((prev) => prev.replace(image, newImage));
  //         }
  //       });
  //     });
  //   }
  // }, [editorEl]);

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
        onChange={handleChange}
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
