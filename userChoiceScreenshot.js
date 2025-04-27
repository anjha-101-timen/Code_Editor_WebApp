document.addEventListener('DOMContentLoaded', () => {
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Utility function to extract syntax-highlighted code for a given range
    function getHighlightedCode(editor, startLine, endLine) {
        const session = editor.getSession();
        let highlightedCode = '';

        for (let i = startLine; i <= endLine; i++) {
            const line = session.getLine(i);
            const tokens = session.getTokens(i);

            // Reconstruct the line with syntax highlighting
            let highlightedLine = '';
            tokens.forEach(token => {
                const className = `ace_${token.type.replace(/\./g, ' ace_')}`;
                highlightedLine += `<span class="${className}">${token.value}</span>`;
            });

            highlightedCode += `<div class="ace_line">${highlightedLine}</div>`;
        }

        return highlightedCode;
    }

    // Utility function to create a temporary DOM element for capturing
    function createTemporaryElement(highlightedCode) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.top = '-9999px'; // Hide it off-screen
        tempDiv.style.padding = '20px'; // Add padding for blank space
        tempDiv.style.backgroundColor = '#272822'; // Ace Editor background color Monokai
        tempDiv.style.color = '#f8f8f2'; // Ace Editor text color Monokai
        tempDiv.style.fontFamily = 'monospace';
        tempDiv.style.fontSize = '16px'; // Increased font size for better readability
        tempDiv.style.whiteSpace = 'pre'; // Preserve whitespace and line breaks
        tempDiv.innerHTML = highlightedCode;

        // Apply Ace Editor's theme styles dynamically
        const aceStyles = {
            'ace_keyword': { color: '#f92672' },
            'ace_string': { color: '#e6db74' },
            'ace_comment': { color: '#75715e' },
            'ace_constant.numeric': { color: '#ae81ff' },
            'ace_constant.language': { color: '#ae81ff' },
            'ace_constant.boolean': { color: '#ae81ff' },
            'ace_support.function': { color: '#66d9ef' },
            'ace_support.constant': { color: '#66d9ef' },
            'ace_variable.parameter': { color: '#fd971f' },
            'ace_storage.type': { color: '#f92672' },
            'ace_entity.name.function': { color: '#a6e22e' },
            'ace_entity.name.tag': { color: '#f92672' },
            'ace_entity.other.attribute-name': { color: '#a6e22e' },
            'ace_invalid.illegal': { color: '#f8f8f0', backgroundColor: '#f92672' },
        };

        // Inject styles into the temporary element
        const styleSheet = document.createElement('style');
        Object.entries(aceStyles).forEach(([className, style]) => {
            styleSheet.innerHTML += `
                .${className} {
                    color: ${style.color};
                    background-color: ${style.backgroundColor || 'transparent'};
                }
            `;
        });
        tempDiv.appendChild(styleSheet);

        document.body.appendChild(tempDiv);
        return tempDiv;
    }

    // Function to calculate the width of the longest line
    function calculateMaxWidth(tempDiv) {
        const lines = tempDiv.querySelectorAll('.ace_line');
        let maxWidth = 0;

        lines.forEach(line => {
            const width = line.scrollWidth; // Get the width of the line
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        return maxWidth + 40; // Add padding (20px on each side)
    }

    // Function to capture the screenshot
    async function captureCustomScreenshot(editor, startLine, endLine) {
        const highlightedCode = getHighlightedCode(editor, startLine, endLine);
        const tempDiv = createTemporaryElement(highlightedCode);

        // Calculate the width of the longest line
        const maxWidth = calculateMaxWidth(tempDiv);

        // Set the width of the temporary div
        tempDiv.style.width = `${maxWidth}px`;

        // Scale up the temporary element for higher resolution
        tempDiv.style.transform = 'scale(2)'; // Double the size for FHD resolution
        tempDiv.style.transformOrigin = 'top left';

        // Capture the screenshot using html2canvas with high quality
        const canvas = await html2canvas(tempDiv, {
            scale: 2, // Double the scale for higher resolution
            useCORS: true,
            allowTaint: false,
            logging: false,
        });

        // Remove the temporary DOM element
        document.body.removeChild(tempDiv);

        // Download the image
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'code_screenshot.png';
        link.click();
    }

    // Event listener for the userChoiceScreenshotBtn button
    document.getElementById('resultBtn').addEventListener('click', () => {
        const totalLines = editor.session.getLength();

        // Create a modal container for user input
        const modal = document.createElement('div');
        modal.classList.add('custom-modal');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.padding = '20px';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        modal.style.zIndex = '1000';

        // Overlay to dim the background
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';

        // Modal content
        modal.innerHTML = `
            <h3 style="margin: 0 0 10px;">Enter Line Range</h3>
            <label for="startLine" style="display: block; margin-bottom: 5px;">Start Line:</label>
            <input type="number" id="startLine" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <label for="endLine" style="display: block; margin-bottom: 5px;">End Line:</label>
            <input type="number" id="endLine" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;">
            <div id="errorMessage" style="color: red; font-size: 12px; margin-bottom: 10px;"></div>
            <button id="submitRange" style="padding: 10px 15px; background-color: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
            <button id="closeModal" style="padding: 10px 15px; background-color: #ccc; color: #000; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Close</button>
        `;

        // Append modal and overlay to the body
        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        // Handle form submission
        const submitButton = modal.querySelector('#submitRange');
        const closeModalButton = modal.querySelector('#closeModal');
        const errorMessage = modal.querySelector('#errorMessage');
        const startLineInput = modal.querySelector('#startLine');
        const endLineInput = modal.querySelector('#endLine');

        submitButton.addEventListener('click', async () => {
            const startLine = parseInt(startLineInput.value, 10);
            const endLine = parseInt(endLineInput.value, 10);

            // Adjust user input to zero-based indexing
            const adjustedStartLine = startLine - 1;
            const adjustedEndLine = endLine - 1;

            // Validate input
            if (
                isNaN(startLine) ||
                isNaN(endLine) ||
                adjustedStartLine < 0 ||
                adjustedEndLine >= totalLines ||
                adjustedStartLine > adjustedEndLine
            ) {
                errorMessage.textContent = 'Invalid range. Please enter valid line numbers.';
                return;
            }

            // Close the modal
            document.body.removeChild(modal);
            document.body.removeChild(overlay);

            // Capture the screenshot
            await captureCustomScreenshot(editor, adjustedStartLine, adjustedEndLine);
        });

        // Close modal when close button is clicked
        closeModalButton.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
    });
});