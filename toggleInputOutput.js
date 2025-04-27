// document.addEventListener('DOMContentLoaded', function () {
//     const hideInputOutputBtn = document.getElementById('hideInputOutputBtn');
//     const inputOutputContainer = document.querySelector('.input-output-container');
//     const verticalBar = document.querySelector('.vertical-bar');
//     const editorContainer = document.querySelector('.editor-container');
//     const rightVerticalBar = document.querySelector('.right-vertical-bar');
//     const container = document.querySelector('.container');

//     let inputOutputContainerParent = inputOutputContainer.parentNode;
//     let verticalBarParent = verticalBar.parentNode;
//     let inputOutputContainerSibling = inputOutputContainer.nextSibling;
//     let verticalBarSibling = verticalBar.nextSibling;
//     let editorPercentageWidth = 50; // default value.

//     function recalculateEditorWidth() {
//         const containerWidth = container.offsetWidth;
//         const editorWidth = (editorPercentageWidth / 100) * containerWidth;
//         const rightVerticalBarWidth = rightVerticalBar.offsetWidth;
//         editorContainer.style.width = (editorWidth - rightVerticalBarWidth) + 'px';
//     }

//     verticalBar.addEventListener('mousedown', (e) => {
//         isResizingVertical = true;
//         document.addEventListener('mousemove', resizeVertical);
//         document.addEventListener('mouseup', () => {
//             isResizingVertical = false;
//             document.removeEventListener('mousemove', resizeVertical);
//         });
//     });

//     function resizeVertical(e) {
//         if (!isResizingVertical) return;
//         const rect = editorContainer.parentElement.getBoundingClientRect();
//         let newWidth = e.clientX - rect.left;
//         const maxWidth = rect.width * 0.6;
//         const minWidth = rect.width * 0.4;

//         newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
//         editorPercentageWidth = (newWidth / rect.width) * 100;
//         editorContainer.style.flex = `0 0 ${editorPercentageWidth}%`;
//         inputOutputContainer.style.flex = `1 1 ${100 - editorPercentageWidth}%`;
//     }

//     hideInputOutputBtn.addEventListener('click', function () {
//         if (!inputOutputContainer.parentNode) {
//             // Re-insert input/output and vertical bar
//             inputOutputContainerParent.insertBefore(inputOutputContainer, inputOutputContainerSibling);
//             verticalBarParent.insertBefore(verticalBar, verticalBarSibling);

//             // Recalculate editor width after DOM update
//             requestAnimationFrame(() => {
//                 recalculateEditorWidth();
//             });

//             // Add resize event listener
//             window.addEventListener('resize', recalculateEditorWidth);
//         } else {
//             // Remove input/output and vertical bar
//             inputOutputContainer.parentNode.removeChild(inputOutputContainer);
//             verticalBar.parentNode.removeChild(verticalBar);

//             // Recalculate editor width after DOM update
//             requestAnimationFrame(() => {
//                 recalculateEditorWidth();
//             });

//             // Remove resize event listener
//             window.removeEventListener('resize', recalculateEditorWidth);
//         }
//     });
// });