import React from "react";
import "./App.css";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Vditor from "vditor";
import "vditor/dist/index.css";

const App = () => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue("");

    new Vditor("vditor", {
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

      // 语言，内置：'zh_CN', 'en_US'
      lang: "en_US",

      // picture add function
      upload: {
        accept: "image/jpeg,image/gif,image/png,image/webp,image/svg",
        url: "https://api.imgbb.com/1/upload",
        linkToImgUrl: "https://api.imgbb.com/1/upload",
        token: "3fc5075c524c5624f9709f9b154b62b5",

        handler: (file) => {
          // convert this file to base64

          function getBase64(img) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(img);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          }

          getBase64(file).then((base64) => {
            // send base64 to server
            console.log(base64);
          });

          // const formData = new FormData();
          // formData.append("image", file);
          // formData.append("key", "3fc5075c524c5624f9709f9b154b62b5");

          // return fetch("https://api.imgbb.com/1/upload", {
          //   method: "POST",
          //   body: formData,
          // })
          //   .then((response) => response.json())
          //   .then((result) => {
          //     console.log(result);
          //     return result.data.url;
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });

          // file.onload = () => {
          //   const response = JSON.parse(file.responseText);
          //   if (file.status === 200) {
          //     const url = response.data.url;
          //     const vditor = this.vditor;
          //     vditor.insertValue(`![](${url})`);
          //   }
          // };

          // const formData = new FormData();
          // formData.append("image", file);

          // fetch(
          //   "https://api.imgbb.com/1/upload?key=3fc5075c524c5624f9709f9b154b62b5",
          //   {
          //     method: "POST",
          //     body: formData,
          //   }
          // )
          //   .then((response) => response.json())
          //   .then((result) => {
          //     console.log("Success:", result);
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
        },

        filename: (name) => {},

        // filename(name) {
        //   return name
        //     .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "")
        //     .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "")
        //     .replace("/\\s/g", "");
        // },

        // imagebb response data
        format: (json) => {
          return json.data.url;
        },

        // url: "https://hacpai.com/api/upload/picture",
        // linkToImgUrl: "https://hacpai.com/api/upload/picture",

        success(editor, msg) {
          console.log(editor + "上传成功" + msg);
          editor.innerHTML =
            editor.innerHTML +
            "![image.png](http://localhost/dz/static/image/common/logo.png)";
        },
        error(msg) {
          console.log("上传成失败:" + msg);
        },
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
        <Box id="vditor" className="vditor" />

        <Button
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "15px",
            right: "55px",
          }}
          size="small"
          onClick={download}
        >
          Save
        </Button>
      </Container>
    </Box>
  );
};

export default App;
