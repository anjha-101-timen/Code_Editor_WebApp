document.getElementById('outputTextDownloadBtn').addEventListener('click', () => {
    // Get the content from the output-area
    const outputContent = document.getElementById('output-area').value;
  
    if (!outputContent.trim()) {
      alert('The output area is empty. Nothing to download.');
      return;
    }
  
    // Create a Blob with the content
    const blob = new Blob([outputContent], { type: 'text/plain' });
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output-content.txt'; // File name for the downloaded file
  
    // Programmatically click the link to trigger the download
    link.click();
  
    // Clean up the URL object after the download
    URL.revokeObjectURL(link.href);
  });