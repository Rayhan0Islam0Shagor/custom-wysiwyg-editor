import React from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const App = () => {
  const [vd, setVd] = React.useState(null);
  React.useEffect(() => {
    const vditor = new Vditor('vditor', {
      height: 360,
      cache: {
        enable: false,
      },
      value: vd,
      mode: 'wysiwyg',
      input: (value) => {
        setVd(value);
      },
      toolbarConfig: {
        pin: true,
      },

      // 语言，内置：'zh_CN', 'en_US'
      lang: 'en_US',

      toolbar: [
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        '|',
        'upload',
        'table',
        '|',
        'undo',
        'redo',
      ],
    });
  }, []);
  console.log(vd);
  return <div id='vditor' className='vditor' />;
};

export default App;
