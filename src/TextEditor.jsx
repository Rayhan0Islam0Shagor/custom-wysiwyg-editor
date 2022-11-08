import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useRef, useState } from 'react';

const TextEditor = () => {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Editor
      initialValue='Write here...'
      previewStyle='vertical'
      height='600px'
      initialEditType='wysiwyg'
      useCommandShortcut={true}
      ref={editorRef}
      onChange={() => {
        setValue(editorRef.current.getInstance().getMarkdown());
      }}
      hideModeSwitch={true}
    />
  );
};

export default TextEditor;
