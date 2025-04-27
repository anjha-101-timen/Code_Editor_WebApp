document.addEventListener('DOMContentLoaded', function () {
    const shareBtn = document.getElementById('shareBtn');
    const modal = document.getElementById('shareModal');

    // Modify the modal to add download buttons
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Share Code</h2>
            <div class="share-links">
                <label for="shareLinkLight">Light Mode Link:</label>
                <div class="link-container">
                    <input type="text" id="shareLinkLight" readonly>
                    <button id="copyLinkBtnLight">Copy</button>
                    <button id="downloadLinkBtnLight">Download HTML</button>
                    <button class="download-pdf" data-mode="light">Download PDF</button>
                </div>
                <label for="shareLinkDark">Dark Mode Link:</label>
                <div class="link-container">
                    <input type="text" id="shareLinkDark" readonly>
                    <button id="copyLinkBtnDark">Copy</button>
                    <button id="downloadLinkBtnDark">Download HTML</button>
                    <button class="download-pdf" data-mode="dark">Download PDF</button>
                </div>
            </div>
        </div>
    `;

    const closeBtn = document.querySelector('.close-btn');
    const copyLinkBtnLight = document.getElementById('copyLinkBtnLight');
    const copyLinkBtnDark = document.getElementById('copyLinkBtnDark');
    const shareLinkInputLight = document.getElementById('shareLinkLight');
    const shareLinkInputDark = document.getElementById('shareLinkDark');
    const downloadLinkBtnLight = document.getElementById('downloadLinkBtnLight');
    const downloadLinkBtnDark = document.getElementById('downloadLinkBtnDark');
    const downloadPdfBtns = document.querySelectorAll('.download-pdf');

    // Open modal on share button click
    shareBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
        generateSharableLinks();
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Copy to clipboard functionality for light mode
    copyLinkBtnLight.addEventListener('click', function () {
        const linkValue = shareLinkInputLight.value.trim();
        if (!linkValue) {
            alert('No link available to copy. Please generate a link first.');
            return;
        }
        navigator.clipboard.writeText(linkValue).then(() => {
            alert('Light mode link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy the light mode link. Please try again.');
        });
    });

    // Copy to clipboard functionality for dark mode
    copyLinkBtnDark.addEventListener('click', function () {
        const linkValue = shareLinkInputDark.value.trim();
        if (!linkValue) {
            alert('No link available to copy. Please generate a link first.');
            return;
        }
        navigator.clipboard.writeText(linkValue).then(() => {
            alert('Dark mode link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy the dark mode link. Please try again.');
        });
    });

    // Add download functionality for light mode
    downloadLinkBtnLight.addEventListener('click', function () {
        downloadHtml(shareLinkInputLight.value, 'shared_code_light.html');
    });

    // Add download functionality for dark mode
    downloadLinkBtnDark.addEventListener('click', function () {
        downloadHtml(shareLinkInputDark.value, 'shared_code_dark.html');
    });

    // Add download PDF functionality
    downloadPdfBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const mode = this.dataset.mode;
            const linkInput = mode === 'light' ? shareLinkInputLight : shareLinkInputDark;
            downloadPdf(linkInput.value, mode === 'light' ? 'shared_code_light.pdf' : 'shared_code_dark.pdf');
        });
    });

    async function generateSharableLinks() {
        try {
            // Get code, input, and output
            const code = ace.edit('editor').getValue();
            const input = document.getElementById('input-area').value;
            const output = document.getElementById('output-area').value;

            // Create shareable HTML content for light mode
            const shareableHtmlLight = createShareableHtml(code, input, output, 'light');
            const dataUrlLight = `data:text/html;charset=utf-8,${encodeURIComponent(shareableHtmlLight)}`;

            // Create shareable HTML content for dark mode
            const shareableHtmlDark = createShareableHtml(code, input, output, 'dark');
            const dataUrlDark = `data:text/html;charset=utf-8,${encodeURIComponent(shareableHtmlDark)}`;

            // Set the sharable links in the input fields
            shareLinkInputLight.value = dataUrlLight;
            shareLinkInputDark.value = dataUrlDark;
        } catch (error) {
            console.error("Error generating shareable links:", error);
            shareLinkInputLight.value = "Error generating light mode link. Please try again.";
            shareLinkInputDark.value = "Error generating dark mode link. Please try again.";
        }
    }

    function createShareableHtml(code, input, output, theme) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shared Code</title>
                <style>
                    /* Import Ubuntu Font */
                    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
                    /* General Styles */
                    :root {
                        --bg-color: #f9f9f9;
                        --text-color: #333;
                        --header-bg: linear-gradient(90deg, #ff7eb3, #ff758c, #ff75c8, #a88eff, #7bc6ff, #7bffab, #fffa7b);
                        --box-bg: white;
                        --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        --pre-border: linear-gradient(90deg, #ff7eb3, #ff758c, #ff75c8, #a88eff, #7bc6ff, #7bffab, #fffa7b);
                        --footer-text: #777;
                    }
                    [data-theme="dark"] {
                        --bg-color: #121212;
                        --text-color: #e0e0e0;
                        --box-bg: #1e1e1e;
                        --box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
                        --footer-text: #bdbdbd;
                    }
                    body {
                        font-family: 'Ubuntu', sans-serif;
                        background-color: var(--bg-color);
                        margin: 0;
                        padding: 20px;
                        color: var(--text-color);
                        overflow-x: hidden;
                        transition: background-color 0.3s ease, color 0.3s ease;
                    }
                    /* Header Section */
                    header {
                        text-align: center;
                        margin-bottom: 40px;
                        opacity: 0;
                        transform: translateY(-20px);
                        animation: fadeInHeader 1s ease-in-out forwards;
                    }
                    header h1 {
                        font-size: 2.5rem;
                        font-weight: 500;
                        color: #6200ea;
                        margin: 0;
                    }
                    header p {
                        font-size: 1rem;
                        color: var(--text-color);
                        margin-top: 5px;
                    }
                    /* Content Section */
                    .content-section {
                        background-color: var(--box-bg);
                        border-radius: 12px;
                        box-shadow: var(--box-shadow);
                        margin-bottom: 20px;
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInContent 1s ease-in-out forwards;
                    }
                    .content-header {
                        background: var(--header-bg);
                        background-size: 300% 300%;
                        animation: gradientAnimation 5s ease infinite;
                        color: white;
                        padding: 15px;
                        font-size: 1.2rem;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        border-radius: 12px 12px 0 0;
                    }
                    pre {
                        background-color: var(--box-bg);
                        padding: 20px;
                        font-size: 0.9rem;
                        line-height: 1.5;
                        overflow-x: auto;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        border: 2px solid transparent;
                        border-image: var(--pre-border) 1;
                        border-radius: 8px;
                    }
                    /* Footer Section */
                    footer {
                        text-align: center;
                        margin-top: 40px;
                        font-size: 0.9rem;
                        color: var(--footer-text);
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInFooter 1s ease-in-out forwards;
                    }
                    footer a {
                        color: #6200ea;
                        text-decoration: none;
                        font-weight: 500;
                    }
                    footer a:hover {
                        text-decoration: underline;
                    }
                    /* Animations */
                    @keyframes fadeInHeader {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fadeInContent {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fadeInFooter {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes gradientAnimation {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                    /* Hover Effects */
                    .content-section:hover {
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                        transition: box-shadow 0.3s ease-in-out;
                    }
                </style>
            </head>
            <body data-theme="${theme}">
                <header>
                    <h1>Shared Code</h1>
                    <p>Below is the code, input, and output you requested.</p>
                </header>
                <div class="content-section">
                    <div class="content-header">Code</div>
                    <pre>${code}</pre>
                </div>
                <div class="content-section">
                    <div class="content-header">Input</div>
                    <pre>${input}</pre>
                </div>
                <div class="content-section">
                    <div class="content-header">Output</div>
                    <pre>${output}</pre>
                </div>
                <footer>
                    Shared via <a href="#" target="_blank">Advanced Code Editor</a>
                </footer>
            </body>
            </html>
        `;
    }

    function downloadHtml(dataUrl, filename) {
        try {
            const html = decodeURIComponent(dataUrl.replace(/^data:text\/html;charset=utf-8,/, ''));
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download HTML:', error);
            alert('Failed to download the HTML file. Please try again.');
        }
    }

    function downloadPdf(dataUrl, filename) {
        try {
            const html = decodeURIComponent(dataUrl.replace(/^data:text\/html;charset=utf-8,/, ''));

            // Debug: Log the HTML content before PDF generation
            console.log("HTML content before PDF generation:", html);

            // Add a slight delay and refined options
            setTimeout(() => {
                const element = document.createElement('div');
                element.innerHTML = html;
                document.body.appendChild(element);

                html2pdf()
                    .from(element)
                    .set({
                        margin: 10,
                        filename: filename,
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                    })
                    .save()
                    .then(() => {
                        document.body.removeChild(element); // Clean up
                    })
                    .catch(error => {
                        console.error('html2pdf error:', error);
                        alert('Failed to download the PDF file. Error during PDF generation.');
                        document.body.removeChild(element); // Clean up
                    });
            }, 500);

        } catch (error) {
            console.error('Error decoding HTML or starting PDF generation:', error);
            alert('Failed to download the PDF file. Error processing HTML.');
        }
    }
});