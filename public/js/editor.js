const editor = document.getElementById('editor');
const editorOutput = document.getElementById('editorOutput'); // hidden text area containing html to be submitted through form

pell.init({
  element: document.getElementById('editor'),
  onChange: html => (editorOutput.innerHTML = html),
  defaultParagraphSeparator: 'p',
  actions: ['bold', 'italic', 'underline', 'olist', 'ulist', 'link'],
  styleWithCSS: false
});

window.onload = () => {
  editor.content.innerHTML = resourceContent || '';
  editorOutput.innerHTML = resourceContent || '';
};
