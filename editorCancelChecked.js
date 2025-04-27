document.addEventListener('DOMContentLoaded', function () {
    const editorCancelBtn = document.getElementById('editorCancelBtn');
    const editorCheckedBtn = document.getElementById('editorCheckedBtn');
    const editorElement = document.getElementById('editor');
    const aceEditor = ace.edit(editorElement);

    const historyKey = 'editorHistory';
    const currentKey = 'editorCurrentContent';

    let history = JSON.parse(localStorage.getItem(historyKey)) || ["", "", "", "", ""]; // Initialize with sample data
    let currentContent = localStorage.getItem(currentKey) || history[history.length - 1] || "";
    let historyIndex = history.length - 1; // Start at the latest history item

    aceEditor.setValue(currentContent);

    function updateHistory(content) {
        history.unshift(content); // Add new content to the beginning
        if (history.length > 10) { // Changed to store 10 actions
            history.pop(); // Remove the oldest entry
        }
        localStorage.setItem(historyKey, JSON.stringify(history));
    }

    function updateCurrentContent(content) {
        localStorage.setItem(currentKey, content);
    }

    editorCancelBtn.addEventListener('click', function () {
        const previousContent = aceEditor.getValue();
        updateHistory(previousContent);
        aceEditor.setValue('');
        updateCurrentContent('');
        historyIndex = 0; // Reset index to the newest when cancelled
    });

    editorCheckedBtn.addEventListener('click', function () {
        if (history.length > 0) {
            aceEditor.setValue(history[historyIndex]);
            historyIndex++;
            if (historyIndex >= history.length) {
                historyIndex = 0; // Loop back to the beginning
            }
            updateCurrentContent(history[historyIndex - 1]);
        }
    });

    aceEditor.on('change', function() {
        updateCurrentContent(aceEditor.getValue());
    });
});