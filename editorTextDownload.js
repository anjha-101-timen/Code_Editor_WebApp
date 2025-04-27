document.addEventListener('DOMContentLoaded', function () {
    const editorTextDownloadBtn = document.getElementById('editorTextDownloadBtn');
    const editorElement = document.getElementById('editor');
    const aceEditor = ace.edit(editorElement);

    editorTextDownloadBtn.addEventListener('click', function () {
        const content = aceEditor.getValue(); // Get the content from the Ace editor
        const filename = 'code.txt'; // Set the filename

        // Create a temporary anchor element
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click(); // Programmatically click the anchor to trigger download

        document.body.removeChild(element); // Remove the anchor element
    });
});