document.addEventListener("DOMContentLoaded", () => {
    const editorPdfImageBtn = document.getElementById("editorPdfImageBtn");
    const editorArea = document.getElementById("editor");

    if (editorPdfImageBtn) {
        editorPdfImageBtn.addEventListener("click", async () => {
            try {
                const selectedResolution = await showResolutionSelect();
                if (!selectedResolution) return;

                const fontColor = localStorage.getItem("editorTextAreaColor") || "black";
                const fontSize = parseFloat(localStorage.getItem("editorTextAreaFontSize")) || 16;
                const fontFamily = localStorage.getItem("editorTextAreaFont") || "'Ubuntu', monospace";
                const backgroundColor = localStorage.getItem("editorTextAreaBackgroundColor") || "white";

                const tempContainer = document.createElement("div");
                tempContainer.style.position = "absolute";
                tempContainer.style.top = "-9999px";
                tempContainer.style.left = "-9999px";
                tempContainer.style.display = "inline-block";
                tempContainer.style.padding = "40px";
                tempContainer.style.margin = "40px";
                tempContainer.style.backgroundColor = backgroundColor;
                tempContainer.style.color = fontColor;
                tempContainer.style.fontFamily = fontFamily;
                tempContainer.style.fontSize = `${fontSize}px`;
                tempContainer.style.imageRendering = "crisp-edges";
                tempContainer.style.lineHeight = "1.5";
                tempContainer.style.whiteSpace = "pre-wrap";
                tempContainer.style.wordWrap = "break-word";

                // Extract text content from Ace editor
                const editor = ace.edit(editorArea);
                tempContainer.textContent = editor.getValue();

                document.body.appendChild(tempContainer);

                await document.fonts.ready;

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                context.font = `${fontSize}px ${fontFamily}`;

                const lines = editor.getValue().split("\n");
                let maxWidth = 0;
                lines.forEach(line => {
                    const lineWidth = context.measureText(line).width;
                    if (lineWidth > maxWidth) {
                        maxWidth = lineWidth;
                    }
                });

                const padding = 80;
                tempContainer.style.width = `${maxWidth + padding}px`;

                const screenshotCanvas = await html2canvas(tempContainer, {
                    scale: 4,
                    useCORS: true,
                    allowTaint: false,
                    logging: false,
                    scrollY: -window.scrollY,
                    scrollX: -window.scrollX,
                });

                const resizedCanvas = resizeCanvas(screenshotCanvas, selectedResolution);
                const resizedImage = resizedCanvas.toDataURL("image/jpeg", 1.0);

                const link = document.createElement("a");
                link.href = resizedImage;
                link.download = `${selectedResolution}_editor_area_screenshot.jpg`;
                link.click();

                document.body.removeChild(tempContainer);
            } catch (error) {
                console.error("Error capturing editor screenshot:", error);
            }
        });
    }

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

            const btnRect = editorPdfImageBtn.getBoundingClientRect();
            selectContainer.style.left = `${btnRect.left + editorPdfImageBtn.offsetWidth + 10}px`;
            selectContainer.style.top = `${btnRect.top}px`;

            document.body.appendChild(selectContainer);
        });
    }

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