document.addEventListener('DOMContentLoaded', function () {
    const fileDownloadButton = document.getElementById('fileDownloadBtn');

    // Add an event listener to the download button
    fileDownloadButton.addEventListener('click', function () {
        // Create a modal dialog dynamically
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.padding = '20px';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        modal.style.zIndex = '1000';
        modal.style.width = '300px';
        modal.style.textAlign = 'center';

        // Add a close button to the modal
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            modal.remove(); // Close the modal when the close button is clicked
        });
        modal.appendChild(closeButton);

        // Add a title to the modal
        const title = document.createElement('h3');
        title.textContent = 'Download File';
        title.style.margin = '0 0 15px 0';
        title.style.fontSize = '18px';
        title.style.color = '#333';
        modal.appendChild(title);

        // Add an input field for the file name
        const fileNameInput = document.createElement('input');
        fileNameInput.type = 'text';
        fileNameInput.placeholder = 'Enter file name (e.g., example.js)';
        fileNameInput.style.width = '100%';
        fileNameInput.style.padding = '8px';
        fileNameInput.style.marginBottom = '15px';
        fileNameInput.style.border = '1px solid #ccc';
        fileNameInput.style.borderRadius = '4px';
        fileNameInput.style.fontSize = '14px';
        modal.appendChild(fileNameInput);

        // Add a download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.style.padding = '10px 20px';
        downloadButton.style.backgroundColor = '#4caf50';
        downloadButton.style.color = '#fff';
        downloadButton.style.border = 'none';
        downloadButton.style.borderRadius = '4px';
        downloadButton.style.cursor = 'pointer';
        downloadButton.style.fontSize = '14px';
        downloadButton.addEventListener('click', () => {
            const fileName = fileNameInput.value.trim();
            if (!fileName) {
                alert('Please enter a valid file name.');
                return;
            }

            // Get the content from the Ace Editor
            const editor = ace.edit('editor');
            const content = editor.getValue();

            // Create a Blob with the content
            const blob = new Blob([content], { type: 'text/plain' });

            // Create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName; // Use the user-provided file name
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);

            // Close the modal after download
            modal.remove();

            // Show the success message with animation
            showDownloadMessage(fileName);
        });
        modal.appendChild(downloadButton);

        // Append the modal to the body
        document.body.appendChild(modal);
    });

    // Function to show the download success message
    function showDownloadMessage(fileName) {
        // Get the Ace Editor container
        const editorContainer = document.querySelector('#editor');
        if (!editorContainer) {
            console.error('Editor container not found!');
            return;
        }

        // Blur the Ace Editor
        editorContainer.style.filter = 'blur(5px)'; // Apply blur effect

        // Remove any existing message box
        const existingMessageBox = document.getElementById('download-message-box');
        if (existingMessageBox) {
            existingMessageBox.remove();
        }

        // Create a new message box
        const messageBox = document.createElement('div');
        messageBox.id = 'download-message-box';
        messageBox.style.position = 'fixed'; // Fixed position relative to the viewport
        messageBox.style.top = '50%';
        messageBox.style.left = '50%';
        messageBox.style.transform = 'translate(-50%, -50%) scale(0)'; // Start with scale 0 for animation
        messageBox.style.backgroundColor = 'yellow'; // Yellow background
        messageBox.style.color = 'black'; // Black text
        messageBox.style.fontWeight = 'bold'; // Bold text
        messageBox.style.padding = '15px 30px';
        messageBox.style.borderRadius = '8px';
        messageBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        messageBox.style.zIndex = '1001'; // Ensure it's above the blurred editor
        messageBox.style.fontFamily = 'Arial, sans-serif';
        messageBox.style.fontSize = '16px';
        messageBox.style.textAlign = 'center';
        messageBox.style.transition = 'transform 1s ease-in-out'; // Smooth animation

        // Set the message content
        messageBox.textContent = `${fileName} downloaded!`;

        // Append the message box to the body (not the editor container)
        document.body.appendChild(messageBox);

        // Trigger the animation after appending the message box
        setTimeout(() => {
            messageBox.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale up to normal size
        }, 10); // Small delay to ensure the browser renders the initial state

        // Automatically remove the message box after 1 second
        setTimeout(() => {
            messageBox.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale down to hide
            setTimeout(() => {
                messageBox.remove(); // Remove the element after the animation ends
                editorContainer.style.filter = 'none'; // Remove blur effect
            }, 1000); // Match the duration of the animation
        }, 1000);
    }
});