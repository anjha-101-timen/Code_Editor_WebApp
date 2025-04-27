document.addEventListener('DOMContentLoaded', function() {
    const outputCancelButton = document.getElementById('outputCancelBtn');
    const outputCheckedButton = document.getElementById('outputCheckedBtn');
    const outputArea = document.getElementById('output-area');
    const HISTORY_KEY = 'outputHistory';
    const CURRENT_KEY = 'outputCurrentContent';

    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || ["", "", "", "", ""]; // Initialize with sample data
    let currentContent = localStorage.getItem(CURRENT_KEY) || history[history.length - 1] || "";
    let historyIndex = history.length - 1; // Start at the latest history item

    outputArea.value = currentContent;

    function updateHistory(content) {
        history.unshift(content); // Add new content to the beginning
        if (history.length > 10) { // Store up to 10 actions
            history.pop(); // Remove the oldest entry
        }
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }

    function updateCurrentContent(content) {
        localStorage.setItem(CURRENT_KEY, content);
    }

    outputCancelButton.addEventListener('click', function() {
        const previousContent = outputArea.value;
        updateHistory(previousContent);
        outputArea.value = '';
        updateCurrentContent('');
        historyIndex = 0; // Reset index to the newest when cancelled
        console.log("Output History:", history, "Current Content:", "");
    });

    outputCheckedButton.addEventListener('click', function() {
        if (history.length > 0) {
            outputArea.value = history[historyIndex];
            historyIndex++;
            if (historyIndex >= history.length) {
                historyIndex = 0; // Loop back to the beginning
            }
            updateCurrentContent(history[historyIndex - 1]);
            console.log("Output History:", history, "Current Content:", history[historyIndex - 1]);
        }
    });

    outputArea.addEventListener('input', function() {
        updateCurrentContent(outputArea.value);
    });
});