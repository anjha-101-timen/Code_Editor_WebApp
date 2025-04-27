document.addEventListener('DOMContentLoaded', function () {
    const editorBackgroundBtn = document.getElementById('editorBackgroundBtn');
    const editorElement = document.getElementById('editor');
    const aceEditor = ace.edit(editorElement);

    // Retrieve saved background color from local storage or default to white
    let savedBackgroundColor = localStorage.getItem('editorBackgroundColor') || '#FFFFFF';
    editorElement.style.backgroundColor = savedBackgroundColor;
    aceEditor.setTheme(`ace/theme/chrome`); //set a default theme to be able to change background.
    aceEditor.renderer.setStyle("ace_editor", `background-color:${savedBackgroundColor}`);

    editorBackgroundBtn.addEventListener('click', function () {
        // Blur the editor area
        editorElement.style.filter = 'blur(5px)';

        // Create color picker modal
        const colorPickerModal = document.createElement('div');
        colorPickerModal.style.position = 'absolute'; // Positioned relative to the editor area
        colorPickerModal.style.backgroundColor = '#37474F';
        colorPickerModal.style.padding = '20px';
        colorPickerModal.style.borderRadius = '8px';
        colorPickerModal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
        colorPickerModal.style.zIndex = '1003'; // Higher than other elements

        // Position the modal at the center of the editor area
        const editorRect = editorElement.getBoundingClientRect();
        colorPickerModal.style.top = `${editorRect.top + window.scrollY + editorRect.height / 2}px`;
        colorPickerModal.style.left = `${editorRect.left + window.scrollX + editorRect.width / 2}px`;
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
            editorElement.style.backgroundColor = savedBackgroundColor;
            aceEditor.renderer.setStyle("ace_editor", `background-color:${savedBackgroundColor}`);
            localStorage.setItem('editorBackgroundColor', savedBackgroundColor);
            document.body.removeChild(colorPickerModal);
            editorElement.style.filter = 'none'; // Remove blur
        });

        // Cancel button event listener
        cancelButton.addEventListener('click', function () {
            document.body.removeChild(colorPickerModal);
            editorElement.style.filter = 'none'; // Remove blur
        });
    });
});