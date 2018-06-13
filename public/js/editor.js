const editor = document.getElementById('editor');
const editorOutput = document.getElementById('editorOutput'); // hidden text area containing html to be submitted through form

pell.init({
  element: document.getElementById('editor'),
  onChange: html => (editorOutput.innerHTML = html),
  defaultParagraphSeparator: 'p',
  actions: [
    'bold',
    'italic',
    'underline',
    'olist',
    'ulist',
    {
      name: 'superscript',
      icon: 'sup',
      title: 'Superscript',
      result: function result() {
        return pell.exec('superscript');
      }
    },
    'link',
    'heading2'
  ],
  styleWithCSS: false,
  classes: {
    actionbar: 'buttons has-addons',
    button: 'button',
    content: 'box content',
    selected: 'has-background-light'
  }
});

window.onload = () => {
  editor.content.innerHTML = resourceContent || '';
  editorOutput.innerHTML = resourceContent || '';
};
