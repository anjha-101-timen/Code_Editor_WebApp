document.addEventListener('DOMContentLoaded', function() {
    const outputTextImageBtn = document.getElementById('outputTextImageBtn');
    const outputArea = document.getElementById('output-area');

    outputTextImageBtn.addEventListener('click', function() {
        showResolutionSelect();
    });

    function showResolutionSelect() {
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
            takeResolutionScreenshot(selectedWidth);
            selectContainer.remove();
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => {
            selectContainer.remove();
        });

        selectContainer.appendChild(select);
        selectContainer.appendChild(confirmButton);
        selectContainer.appendChild(closeButton);

        const btnRect = outputTextImageBtn.getBoundingClientRect();
        selectContainer.style.left = `${btnRect.left + outputTextImageBtn.offsetWidth + 10}px`;
        selectContainer.style.top = `${btnRect.top}px`;

        document.body.appendChild(selectContainer);
    }

    function takeResolutionScreenshot(targetWidth) {
        const text = outputArea.value;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const fontSize = 16;
        const lineHeight = 1.2;
        const padding = 20;
        const font = `${fontSize}px Ubuntu Medium`; // Use Ubuntu Medium to match the editor

        const lines = text.split('\n');
        let maxWidth = 0;
        context.font = font;
        lines.forEach(line => {
            const width = context.measureText(line).width;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });

        let baseWidth = maxWidth + 2 * padding;
        let baseHeight = lines.length * fontSize * lineHeight + 2 * padding;

        const scale = targetWidth / baseWidth;

        canvas.width = baseWidth * scale;
        canvas.height = baseHeight * scale;

        context.scale(scale, scale);

        context.fillStyle = '#202020'; // Use the editor's background color
        context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

        context.fillStyle = '#d4d4d4'; // Use the editor's text color
        context.font = font;
        lines.forEach((line, index) => {
            context.fillText(line, padding, padding + index * fontSize * lineHeight + fontSize);
        });

        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${targetWidth}_output_screenshot.png`;
        link.click();
    }
});