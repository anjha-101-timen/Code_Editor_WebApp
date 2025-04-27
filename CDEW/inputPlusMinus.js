document.addEventListener('DOMContentLoaded', function() {
    const inputPlusBtn = document.getElementById('inputPlusBtn');
    const inputMinusBtn = document.getElementById('inputMinusBtn');
    const inputTextArea = document.getElementById('input-area');

    // Retrieve font size from local storage or use default
    let currentFontSize = parseInt(localStorage.getItem('inputFontSize')) || 16;
    inputTextArea.style.fontSize = currentFontSize + 'px'; // Set initial font size

    inputPlusBtn.addEventListener('click', function() {
        currentFontSize += 2.5;
        inputTextArea.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('inputFontSize', currentFontSize); // Save to local storage
    });

    inputMinusBtn.addEventListener('click', function() {
        if (currentFontSize > 10) {
            currentFontSize -= 2.5;
            inputTextArea.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('inputFontSize', currentFontSize); // Save to local storage
        }
    });
});