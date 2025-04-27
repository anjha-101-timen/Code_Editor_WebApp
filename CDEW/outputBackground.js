document.addEventListener('DOMContentLoaded', function () {
    const outputBackgroundBtn = document.getElementById('outputBackgroundBtn');
    const outputTextArea = document.getElementById('output-area');

    // Retrieve saved background color from local storage or default to white
    let savedBackgroundColor = localStorage.getItem('outputTextareaBackgroundColor') || '#FFFFFF';
    outputTextArea.style.backgroundColor = savedBackgroundColor;

    outputBackgroundBtn.addEventListener('click', function () {
        // Blur the output text box area
        outputTextArea.style.filter = 'blur(5px)';

        // Create color picker modal
        const colorPickerModal = document.createElement('div');
        colorPickerModal.style.position = 'absolute'; // Positioned relative to the output text box
        colorPickerModal.style.backgroundColor = '#37474F';
        colorPickerModal.style.padding = '20px';
        colorPickerModal.style.borderRadius = '8px';
        colorPickerModal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
        colorPickerModal.style.zIndex = '1003'; // Higher than other elements

        // Position the modal at the center of the output text box area
        const outputRect = outputTextArea.getBoundingClientRect();
        colorPickerModal.style.top = `${outputRect.top + window.scrollY + outputRect.height / 2}px`;
        colorPickerModal.style.left = `${outputRect.left + window.scrollX + outputRect.width / 2}px`;
        colorPickerModal.style.transform = 'translate(-50%, -50%)';

        // Create color input element
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = savedBackgroundColor;
        colorPickerModal.appendChild(colorInput);

        // Create OK and Cancel buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.marginTop = '10px';
        colorPickerModal.appendChild(buttonContainer);

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.backgroundColor = '#4CAF50';
        okButton.style.color = 'white';
        okButton.style.padding = '8px 12px';
        okButton.style.border = 'none';
        okButton.style.borderRadius = '4px';
        okButton.style.marginRight = '10px';
        okButton.style.cursor = 'pointer';
        buttonContainer.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.padding = '8px 12px';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        buttonContainer.appendChild(cancelButton);

        // Append modal to body
        document.body.appendChild(colorPickerModal);

        // OK button event listener
        okButton.addEventListener('click', function () {
            savedBackgroundColor = colorInput.value;
            outputTextArea.style.backgroundColor = savedBackgroundColor;
            localStorage.setItem('outputTextareaBackgroundColor', savedBackgroundColor);
            document.body.removeChild(colorPickerModal);
            outputTextArea.style.filter = 'none'; // Remove blur
        });

        // Cancel button event listener
        cancelButton.addEventListener('click', function () {
            document.body.removeChild(colorPickerModal);
            outputTextArea.style.filter = 'none'; // Remove blur
        });
    });
});