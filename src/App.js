import React from "react";
import "./App.css";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Vditor from "vditor";
import "vditor/dist/index.css";

const App = () => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setValue("");

    const vditor = new Vditor("vditor", {
      height: 360,
      cache: {
        enable: false,
      },
      value: value,
      mode: "wysiwyg",
      input: (value) => {
        setValue(value);
      },
      toolbarConfig: {
        pin: true,
      },

      lang: "en_US",

      // picture add function
      upload: {
        accept: "image/jpeg,image/gif,image/png,image/webp,image/svg",

        handler: async (files) => {
          try {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("upload_preset", "my-uploads");

            const data = await fetch(
              `https://api.cloudinary.com/v1_1/dakiuwhwl/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const res = await data.json();

            const name = `![${files[0].name}](${res.secure_url})`;
            vditor.insertValue(name);
            setLoading(false);
            return name;
          } catch (error) {
            alert(error);
            setLoading(false);
          }
        },

        // format: (response) => {
        //   return response.secure_url;
        // },

        // linkToImgFormat: (url) => {
        //   return `![${url}](${url})`;
        // },

        // linkToImgCallback(url) {
        //   console.log(url);
        // },

        // success(editor, msg) {
        //   editor.innerHTML = editor.innerHTML + `![image.png](${msg})`;
        // },

        // error(msg) {
        //   alert(msg);
        // },
      },

      toolbar: [
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "|",
        "upload",
        "table",
        "|",
        "undo",
        "redo",
      ],
    });
  }, []);

  // download the vd value as a markdown file
  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    const filename = new Date().toLocaleString() + ".md"; // today's date
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Box
      sx={{
        marginTop: 10,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box id="vditor" className={`vditor ${loading ? "loading" : ""}`} />

          <Button
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "15px",
              right: "30px",
            }}
            size="small"
            onClick={download}
          >
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
