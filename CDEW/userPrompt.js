document.addEventListener('DOMContentLoaded', function () {
    const additionalInput = document.querySelector('.additional-input');
    const editorContainer = document.getElementById('editor'); // Main code editor container

    additionalInput.addEventListener('click', function () {
        // Blur the main code editor
        editorContainer.style.filter = 'blur(5px)';

        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '1002'; // Higher than editor z-index
        modalOverlay.style.opacity = '0';
        modalOverlay.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(modalOverlay);

        // Trigger the fade-in animation
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
        }, 10);

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#37474F';
        modalContent.style.background = 'linear-gradient(135deg, #E95420, #FFFF00)'; // Yellow to Ubuntu Orange gradient
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '12px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '600px';
        modalContent.style.color = '#000000'; // Bold black text
        modalContent.style.fontFamily = "'Ubuntu', sans-serif"; // Ubuntu Medium 500 font
        modalContent.style.fontWeight = '500';
        modalContent.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.transition = 'transform 0.3s ease-in-out';
        modalOverlay.appendChild(modalContent);

        // Position the modal exactly at the center of the main code editor
        const editorRect = editorContainer.getBoundingClientRect();
        modalContent.style.position = 'absolute';
        modalContent.style.top = `${editorRect.top + window.scrollY + editorRect.height / 2}px`;
        modalContent.style.left = `${editorRect.left + window.scrollX + editorRect.width / 2}px`;
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';

        // Animate modal content scaling
        setTimeout(() => {
            modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        // Create textarea for user prompt
        const promptTextarea = document.createElement('textarea');
        promptTextarea.style.width = '100%';
        promptTextarea.style.height = '150px';
        promptTextarea.style.padding = '10px';
        promptTextarea.style.marginBottom = '10px';
        promptTextarea.style.borderRadius = '6px';
        promptTextarea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Subtle white background
        promptTextarea.style.color = '#000000'; // Bold black text
        promptTextarea.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        promptTextarea.style.resize = 'vertical';
        promptTextarea.style.fontSize = '1rem';
        promptTextarea.style.fontFamily = "'Ubuntu', sans-serif"; // Consistent font
        promptTextarea.value = additionalInput.value; // Display current text
        modalContent.appendChild(promptTextarea);

        // Create OK and Cancel buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.gap = '10px';
        modalContent.appendChild(buttonContainer);

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.backgroundColor = '#4CAF50';
        okButton.style.color = '#000000'; // Black text for contrast
        okButton.style.padding = '10px 15px';
        okButton.style.border = 'none';
        okButton.style.borderRadius = '6px';
        okButton.style.cursor = 'pointer';
        okButton.style.fontFamily = "'Ubuntu', sans-serif";
        okButton.style.fontWeight = '500';
        okButton.style.transition = 'background-color 0.3s ease';
        buttonContainer.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.color = '#000000'; // Black text for contrast
        cancelButton.style.padding = '10px 15px';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '6px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontFamily = "'Ubuntu', sans-serif";
        cancelButton.style.fontWeight = '500';
        cancelButton.style.transition = 'background-color 0.3s ease';
        buttonContainer.appendChild(cancelButton);

        // Hover effects for buttons
        okButton.addEventListener('mouseenter', () => {
            okButton.style.backgroundColor = '#388E3C'; // Darker green on hover
        });
        okButton.addEventListener('mouseleave', () => {
            okButton.style.backgroundColor = '#4CAF50';
        });

        cancelButton.addEventListener('mouseenter', () => {
            cancelButton.style.backgroundColor = '#D32F2F'; // Darker red on hover
        });
        cancelButton.addEventListener('mouseleave', () => {
            cancelButton.style.backgroundColor = '#f44336';
        });

        // OK button event listener
        okButton.addEventListener('click', function () {
            additionalInput.value = promptTextarea.value;

            // Smooth fade-out animation before removing the modal
            modalOverlay.style.opacity = '0';
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                editorContainer.style.filter = 'none'; // Remove blur effect
            }, 300); // Match the duration of the transition
        });

        // Cancel button event listener
        cancelButton.addEventListener('click', function () {
            // Smooth fade-out animation before removing the modal
            modalOverlay.style.opacity = '0';
            modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                editorContainer.style.filter = 'none'; // Remove blur effect
            }, 300); // Match the duration of the transition
        });
    });
});