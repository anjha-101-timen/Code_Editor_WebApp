// uploadPrompt.js
document.addEventListener('DOMContentLoaded', function() {
    const additionalInput = document.querySelector('.additional-input');
    const uploadPromptBtn = document.getElementById('uploadPromptBtn');

    uploadPromptBtn.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.txt';

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    additionalInput.value = e.target.result;
                };
                reader.readAsText(file);
            }
        });

        fileInput.click();
    });
});