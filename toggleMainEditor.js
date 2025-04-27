// // hideMainEditor.js

// document.addEventListener('DOMContentLoaded', function () {
//     const hideMainEditorBtn = document.getElementById('hideMainEditorBtn');
//     const editorContainer = document.querySelector('.editor-container');
//     const inputOutputContainer = document.querySelector('.input-output-container');

//     hideMainEditorBtn.addEventListener('click', function () {
//         if (editorContainer.style.display === 'none' || editorContainer.style.display === '') {
//             // Show editor, hide input/output
//             editorContainer.style.display = 'block';
//             inputOutputContainer.style.display = 'none';
//         } else {
//             // Hide editor, show input/output
//             editorContainer.style.display = 'none';
//             inputOutputContainer.style.display = 'flex';
//         }
//     });
// });