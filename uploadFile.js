document.addEventListener('DOMContentLoaded', function () {
    const fileUploadButton = document.getElementById('fileUploadBtn');

    // Add an event listener to the file upload button
    fileUploadButton.addEventListener('click', function () {
        // Create a hidden file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file'; // Allow all file types

        // Trigger the file selection dialog
        fileInput.click();

        // Handle the file selection
        fileInput.addEventListener('change', function (event) {
            const selectedFile = event.target.files[0]; // Get the first selected file

            if (selectedFile) {
                readFileContent(selectedFile)
                    .then(content => {
                        // Load the file content into the Ace Editor
                        const editor = ace.edit('editor');
                        editor.setValue(content, -1); // Set the content and move the cursor to the start

                        // Show a message with the file name and extension
                        showUploadMessageInEditor(selectedFile.name);
                    })
                    .catch(error => {
                        console.error('Error reading file:', error);
                        // Do nothing in the UI; fail silently
                    });
            }
        });
    });

    // Function to read the content of the selected file
    function readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                resolve(event.target.result); // Resolve with the file content
            };

            reader.onerror = function () {
                reject(reader.error); // Reject with the error
            };

            reader.readAsText(file); // Attempt to read the file as text
        });
    }

    // Function to dynamically show a message inside the Ace Code Editor
    function showUploadMessageInEditor(fileName) {
        // Get the Ace Editor container
        const editorContainer = document.querySelector('#editor');
        if (!editorContainer) {
            console.error('Editor container not found!');
            return;
        }

        // Blur the Ace Editor
        editorContainer.style.filter = 'blur(5px)'; // Apply blur effect

        // Remove any existing message box
        const existingMessageBox = document.getElementById('upload-message-box');
        if (existingMessageBox) {
            existingMessageBox.remove();
        }

        // Create a new message box
        const messageBox = document.createElement('div');
        messageBox.id = 'upload-message-box';
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
        messageBox.textContent = `${fileName} uploaded!`;

        // Append the message box to the body (not the editor container)
        document.body.appendChild(messageBox);

        // Trigger the animation after appending the message box
        setTimeout(() => {
            messageBox.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale up to normal size
        }, 10); // Small delay to ensure the browser renders the initial state

        // Automatically remove the message box after 3 seconds
        setTimeout(() => {
            messageBox.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale down to hide
            setTimeout(() => {
                messageBox.remove(); // Remove the element after the animation ends
                editorContainer.style.filter = 'none'; // Remove blur effect
            }, 1000); // Match the duration of the animation
        }, 3000);
    }
});