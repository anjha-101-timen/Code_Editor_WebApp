document.getElementById('inputTextUploadBtn').addEventListener('click', () => {
    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    
    // Trigger the file selection dialog when the button is clicked
    fileInput.click();
  
    // Handle the file selection
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0]; // Get the selected file
  
      if (!file) {
        alert('No file selected.');
        return;
      }
  
      // Read the file content and validate it
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const fileContent = e.target.result; // Get the file content as text
  
        // Check if the file contains binary data
        if (isBinary(fileContent)) {
          alert('The selected file is not a valid text file or contains binary data.');
          return;
        }
  
        // Display the content in the input-area
        document.getElementById('input-area').value = fileContent;
      };
  
      reader.onerror = () => {
        alert('An error occurred while reading the file.');
      };
  
      // Read the file as text
      reader.readAsText(file);
    });
  });
  
  /**
   * Checks if the content is likely binary.
   * @param {string} content - The file content.
   * @returns {boolean} - True if the content is binary, false otherwise.
   */
  function isBinary(content) {
    // Binary files often contain null characters (\x00)
    return /\x00/.test(content);
  }