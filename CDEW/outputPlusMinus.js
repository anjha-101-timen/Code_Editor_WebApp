document.addEventListener('DOMContentLoaded', function() {
    const outputPlusBtn = document.getElementById('outputPlusBtn');
    const outputMinusBtn = document.getElementById('outputMinusBtn');
    const outputTextArea = document.getElementById('output-area');

    // Output area font size handling
    let currentOutputFontSize = parseInt(localStorage.getItem('outputFontSize')) || 16;
    outputTextArea.style.fontSize = currentOutputFontSize + 'px';

    outputPlusBtn.addEventListener('click', function() {
        currentOutputFontSize += 2.5;
        outputTextArea.style.fontSize = currentOutputFontSize + 'px';
        localStorage.setItem('outputFontSize', currentOutputFontSize);
    });

    outputMinusBtn.addEventListener('click', function() {
        if (currentOutputFontSize > 10) {
            currentOutputFontSize -= 2.5;
            outputTextArea.style.fontSize = currentOutputFontSize + 'px';
            localStorage.setItem('outputFontSize', currentOutputFontSize);
        }
    });
});