document.addEventListener('DOMContentLoaded', function() {
    const editorPlusBtn = document.getElementById('editorPlusBtn');
    const editorMinusBtn = document.getElementById('editorMinusBtn');
    const editorElement = document.getElementById('editor');
    const aceEditor = ace.edit(editorElement);

    let currentFontSize = parseInt(localStorage.getItem('editorFontSize')) || 12; // Initial font size from localStorage or 12

    function updateFontSize() {
        editorElement.style.fontSize = `${currentFontSize}px`;
        aceEditor.setFontSize(currentFontSize);
        localStorage.setItem('editorFontSize', currentFontSize); // Store font size in localStorage
    }

    updateFontSize(); // Apply initial font size

    if (editorPlusBtn && editorMinusBtn && editorElement && aceEditor) {
        editorPlusBtn.addEventListener('click', function() {
            currentFontSize += 2;
            updateFontSize();
        });

        editorMinusBtn.addEventListener('click', function() {
            currentFontSize = Math.max(8, currentFontSize - 2);
            updateFontSize();
        });
    } else {
        console.error("One or more required elements not found.");
    }
});