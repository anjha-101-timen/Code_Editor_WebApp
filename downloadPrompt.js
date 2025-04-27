// downloadPrompt.js
document.addEventListener('DOMContentLoaded', function() {
    const additionalInput = document.querySelector('.additional-input');
    const downloadPromptBtn = document.getElementById('downloadPromptBtn');

    downloadPromptBtn.addEventListener('click', function() {
        const text = additionalInput.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'prompt.txt';
        document.body.appendChild(a);
        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });
});