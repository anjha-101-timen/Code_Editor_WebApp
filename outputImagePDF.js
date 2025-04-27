document.addEventListener("DOMContentLoaded", () => {
    const outputPdfImageBtn = document.getElementById("outputPdfImageBtn");
    const outputArea = document.getElementById("output-area");

    // Ensure the button exists before attaching an event listener
    if (outputPdfImageBtn) {
        outputPdfImageBtn.addEventListener("click", async () => {
            try {
                // Show resolution selection menu
                const selectedResolution = await showResolutionSelect();
                if (!selectedResolution) return; // Exit if no resolution is selected

                // Retrieve styles from local storage each time the button is clicked
                const fontColor = localStorage.getItem("outputTextareaColor") || "black"; // Font color
                const fontSize = parseFloat(localStorage.getItem("outputFontSize")) || 16; // Font size (dynamically retrieved)
                const fontFamily = localStorage.getItem("outputTextareaFont") || "'Ubuntu', monospace"; // Font family
                const backgroundColor = localStorage.getItem("outputTextareaBackgroundColor") || "white"; // Background color

                // Create a temporary container to hold the styled content
                const tempContainer = document.createElement("div");
                tempContainer.style.position = "absolute";
                tempContainer.style.top = "-9999px"; // Hide it off-screen
                tempContainer.style.left = "-9999px";
                tempContainer.style.display = "inline-block"; // Allow the container to grow dynamically
                tempContainer.style.padding = "40px"; // Increased padding for better spacing
                tempContainer.style.margin = "40px"; // Increased margin for better spacing
                tempContainer.style.backgroundColor = backgroundColor; // Use background color from local storage
                tempContainer.style.color = fontColor;
                tempContainer.style.fontFamily = fontFamily;
                tempContainer.style.fontSize = `${fontSize}px`; // Apply dynamically retrieved font size
                tempContainer.style.imageRendering = "crisp-edges"; // Ensure sharp rendering
                tempContainer.style.lineHeight = "1.5"; // Improve readability
                tempContainer.style.whiteSpace = "pre-wrap"; // Preserve line breaks and wrap text
                tempContainer.style.wordWrap = "break-word"; // Break long words if necessary

                // Add the content of the output area to the temporary container
                tempContainer.textContent = outputArea.value;

                // Append the temporary container to the body
                document.body.appendChild(tempContainer);

                // Wait for fonts to load (optional but recommended for custom fonts)
                await document.fonts.ready;

                // Measure the width of the longest line in the output
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                context.font = `${fontSize}px ${fontFamily}`;

                // Split the output text into lines and measure the longest line
                const lines = outputArea.value.split("\n");
                let maxWidth = 0;
                lines.forEach(line => {
                    const lineWidth = context.measureText(line).width;
                    if (lineWidth > maxWidth) {
                        maxWidth = lineWidth;
                    }
                });

                // Set the width of the temporary container to fit the longest line
                const padding = 80; // Total horizontal padding (left + right)
                tempContainer.style.width = `${maxWidth + padding}px`;

                // Use html2canvas to capture the screenshot with improved quality settings
                const screenshotCanvas = await html2canvas(tempContainer, {
                    scale: 4, // Higher resolution (default is 1)
                    useCORS: true, // Enable CORS for external resources
                    allowTaint: false, // Prevent tainted canvases
                    logging: false, // Disable logging for cleaner output
                    scrollY: -window.scrollY, // Fix scrolling issues
                    scrollX: -window.scrollX, // Fix scrolling issues
                });

                // Convert the canvas to an image with high quality
                const image = screenshotCanvas.toDataURL("image/jpeg", 1.0); // Use JPEG with maximum quality

                // Resize the image to the selected resolution
                const resizedCanvas = resizeCanvas(screenshotCanvas, selectedResolution);

                // Convert the resized canvas to an image
                const resizedImage = resizedCanvas.toDataURL("image/jpeg", 1.0);

                // Create a download link for the image
                const link = document.createElement("a");
                link.href = resizedImage;
                link.download = `${selectedResolution}_fhd_quality_output_area_screenshot.jpg`; // Improved file name
                link.click();

                // Remove the temporary container from the DOM
                document.body.removeChild(tempContainer);
            } catch (error) {
                console.error("Error capturing screenshot:", error);
            }
        });
    }

    /**
     * Show resolution selection menu and return the selected resolution.
     */
    function showResolutionSelect() {
        return new Promise((resolve) => {
            const resolutions = {
                'HD': 1280,
                'FHD': 1920,
                '1.5K': 2160,
                '2K': 2560,
                '2.5K': 3200,
            };

            const selectContainer = document.createElement('div');
            selectContainer.id = 'resolutionSelectContainer';
            selectContainer.style.position = 'absolute';
            selectContainer.style.zIndex = '1000';

            const select = document.createElement('select');
            select.id = 'resolutionSelect';

            Object.keys(resolutions).forEach(key => {
                const option = document.createElement('option');
                option.value = resolutions[key];
                option.textContent = key;
                select.appendChild(option);
            });

            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Capture';
            confirmButton.addEventListener('click', () => {
                const selectedWidth = parseInt(select.value);
                selectContainer.remove();
                resolve(selectedWidth);
            });

            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', () => {
                selectContainer.remove();
                resolve(null);
            });

            selectContainer.appendChild(select);
            selectContainer.appendChild(confirmButton);
            selectContainer.appendChild(closeButton);

            const btnRect = outputPdfImageBtn.getBoundingClientRect();
            selectContainer.style.left = `${btnRect.left + outputPdfImageBtn.offsetWidth + 10}px`;
            selectContainer.style.top = `${btnRect.top}px`;

            document.body.appendChild(selectContainer);
        });
    }

    /**
     * Resize a canvas to the specified width while maintaining aspect ratio.
     */
    function resizeCanvas(originalCanvas, targetWidth) {
        const originalWidth = originalCanvas.width;
        const originalHeight = originalCanvas.height;

        const scale = targetWidth / originalWidth;
        const targetHeight = Math.round(originalHeight * scale);

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = targetWidth;
        resizedCanvas.height = targetHeight;

        const context = resizedCanvas.getContext('2d');
        context.drawImage(originalCanvas, 0, 0, targetWidth, targetHeight);

        return resizedCanvas;
    }
});