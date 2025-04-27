const horizontalBar = document.querySelector('.horizontal-bar');
const inputArea = document.querySelector('.input-area');
const outputArea = document.querySelector('.output-area');

let isResizingHorizontal = false;

horizontalBar.addEventListener('mousedown', (e) => {
    isResizingHorizontal = true;
    document.addEventListener('mousemove', resizeHorizontal);
    document.addEventListener('mouseup', () => {
        isResizingHorizontal = false;
        document.removeEventListener('mousemove', resizeHorizontal);
    });
});

function resizeHorizontal(e) {
    if (!isResizingHorizontal) return;
    const rect = inputArea.parentElement.getBoundingClientRect();
    let newHeight = e.clientY - rect.top;
    const maxHeight = rect.height * 0.85; // 85%
    const minHeight = rect.height * 0.15; // 15%

    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    // Calculate the percentage of the newHeight relative to the container's height
    const percentageHeight = (newHeight / rect.height) * 100;

    inputArea.style.flex = `0 0 ${percentageHeight}%`;
    const outputPercentageHeight = 100 - percentageHeight;
    outputArea.style.flex = `1 1 ${outputPercentageHeight}%`;
}

const verticalBar = document.querySelector('.vertical-bar');
const editorContainer = document.querySelector('.editor-container');
const inputOutputContainer = document.querySelector('.input-output-container');

let isResizingVertical = false;

verticalBar.addEventListener('mousedown', (e) => {
    isResizingVertical = true;
    document.addEventListener('mousemove', resizeVertical);
    document.addEventListener('mouseup', () => {
        isResizingVertical = false;
        document.removeEventListener('mousemove', resizeVertical);
    });
});

function resizeVertical(e) {
    if (!isResizingVertical) return;
    const rect = editorContainer.parentElement.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    const maxWidth = rect.width * 0.6; // 60%
    const minWidth = rect.width * 0.4; // 40%

    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

    // Calculate the percentage of the newWidth relative to the container's width
    const percentageWidth = (newWidth / rect.width) * 100;

    editorContainer.style.flex = `0 0 ${percentageWidth}%`;

    // Ensure inputOutputContainer always has some width
    const outputPercentageWidth = 100 - percentageWidth;
    inputOutputContainer.style.flex = `1 1 ${outputPercentageWidth}%`; // Use flex-basis to ensure some width
}













// const bottomVerticalBar = document.querySelector('.bottom-vertical-bar');
// const mainContent = document.querySelector('.main-content');

// let isResizingBottomVertical = false;

// bottomVerticalBar.addEventListener('mousedown', (e) => {
//     isResizingBottomVertical = true;
//     document.addEventListener('mousemove', resizeBottomVertical);
//     document.addEventListener('mouseup', () => {
//         isResizingBottomVertical = false;
//         document.removeEventListener('mousemove', resizeBottomVertical);
//     });
// });

// function resizeBottomVertical(e) {
//     if (!isResizingBottomVertical) return;
//     const rect = mainContent.getBoundingClientRect();
//     let newHeight = e.clientY - rect.top;
//     const maxHeight = rect.height * 0.95; // 95%
//     const minHeight = rect.height * 0.5; // 50%

//     newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

//     // Calculate the percentage of the newHeight relative to the container's height
//     const percentageHeight = (newHeight / rect.height) * 100;

//     mainContent.style.flex = `0 0 ${percentageHeight}%`;
// }




const editorLabel = document.querySelector('.editor-label');

function changeEditorGradient() {
    // Define light and dark red color values
    const lightRed = '#FF8080'; // Light red
    const darkRed = '#800000';   // Dark red

    // Generate a random position for the gradient
    const randomPosition = Math.random() * 100; // 0 to 100

    // Create the gradient string
    const gradient = `linear-gradient(to right, ${lightRed} ${randomPosition}%, ${darkRed})`;

    // Apply the gradient to the editor label
    editorLabel.style.background = gradient;
}

// Change the gradient every 2 seconds
setInterval(changeEditorGradient, 2000);

// Initial call to set the gradient
changeEditorGradient();

const inputLabel = document.querySelector('.input-label');

function changeInputGradient() {
    // Define light and dark green color values
    const lightGreen = '#80FF80'; // Light green
    const darkGreen = '#008000';   // Dark green

    // Generate a random position for the gradient
    const randomPosition = Math.random() * 100; // 0 to 100

    // Create the gradient string
    const gradient = `linear-gradient(to right, ${lightGreen} ${randomPosition}%, ${darkGreen})`;

    // Apply the gradient to the input label
    inputLabel.style.background = gradient;
}

// Change the gradient every 2 seconds
setInterval(changeInputGradient, 2000);

// Initial call to set the gradient
changeInputGradient();

const outputLabel = document.querySelector('.output-label');

function changeOutputGradient() {
    // Define light and dark blue color values
    const lightBlue = '#8080FF'; // Light blue
    const darkBlue = '#000080';   // Dark blue

    // Generate a random position for the gradient
    const randomPosition = Math.random() * 100; // 0 to 100

    // Create the gradient string
    const gradient = `linear-gradient(to right, ${lightBlue} ${randomPosition}%, ${darkBlue})`;

    // Apply the gradient to the output label
    outputLabel.style.background = gradient;
}

// Change the gradient every 2 seconds
setInterval(changeOutputGradient, 2000);

// Initial call to set the gradient
changeOutputGradient();

// document.addEventListener('DOMContentLoaded', function() {
//     var editor = ace.edit("editor");
//     editor.setTheme("ace/theme/monokai");
//     editor.session.setMode("ace/mode/javascript");

//     let fontSize = 12; // Initial font size

//     document.addEventListener('keydown', function(event) {
//         if (event.altKey) {
//             if (event.key === '+' || event.key === '=') { // Support both + and = keys
//                 fontSize++;
//                 editor.setFontSize(fontSize + "px");
//             } else if (event.key === '-') {
//                 fontSize--;
//                 if (fontSize < 6) { // Minimum font size
//                     fontSize = 6;
//                 }
//                 editor.setFontSize(fontSize + "px");
//             }
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const editor = ace.edit("editor");

    // Set the mode to plain text
    editor.session.setMode("ace/mode/text");

    // ... (rest of your script.js code) ...
});


document.addEventListener('DOMContentLoaded', function () {
    // Select all textareas within input and output areas
    const textareas = document.querySelectorAll('.input-area textarea, .output-area textarea');

    // Disable spellchecking for each textarea
    textareas.forEach(textarea => {
        textarea.setAttribute('spellcheck', 'false');
    });
});








