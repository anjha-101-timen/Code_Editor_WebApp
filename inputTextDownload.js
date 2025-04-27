document.getElementById('inputTextDownloadBtn').addEventListener('click', () => {
    // Get the content from the input-area
    const inputContent = document.getElementById('input-area').value;
  
    if (!inputContent.trim()) {
      alert('The input area is empty. Nothing to download.');
      return;
    }
  
    // Create a Blob with the content
    const blob = new Blob([inputContent], { type: 'text/plain' });
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'input-content.txt'; // File name for the downloaded file
  
    // Programmatically click the link to trigger the download
    link.click();
  
    // Clean up the URL object after the download
    URL.revokeObjectURL(link.href);
  });