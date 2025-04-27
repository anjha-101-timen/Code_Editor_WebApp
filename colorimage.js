document.addEventListener('DOMContentLoaded', function() {
    const colorImageBtn = document.getElementById('colorImage');
    const editor = ace.edit("editor");

    if (colorImageBtn) {
        colorImageBtn.addEventListener('click', function() {
            takeColorScreenshot();
        });
    }

    function takeColorScreenshot() {
        const session = editor.getSession();
        const renderer = editor.renderer;
        const lineHeight = renderer.lineHeight;
        const charWidth = renderer.characterWidth;
        const scale = 2;

        const lines = session.getLines(0, session.getLength());
        const maxWidth = Math.max(...lines.map(line => line.length * charWidth));

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const fullHeight = lines.length * lineHeight;

        canvas.width = maxWidth * scale;
        canvas.height = fullHeight * scale;
        context.scale(scale, scale);

        context.fillStyle = renderer.$textLayer.$bgcolor;
        context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

        lines.forEach((line, index) => {
            const row = index;
            const screenLines = renderer.$getScreenLines(row, row);
            const tokens = screenLines[0].tokens;
            let x = 0;
            tokens.forEach(token => {
                const color = renderer.$textLayer.$getStyle(token.type);
                context.fillStyle = color;
                context.fillText(token.value, x, lineHeight * (index + 1));
                x += token.value.length * charWidth;
            });
        });

        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);

            // Create an invisible iframe
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            // Set the iframe's src to the Blob URL
            iframe.src = url;

            // Trigger the download by setting the iframe's location
            iframe.contentWindow.location.assign(url);

            // Remove the iframe after a short delay
            setTimeout(function() {
                document.body.removeChild(iframe);
                URL.revokeObjectURL(url);
            }, 1000); // Adjust the delay if needed
        }, 'image/png');
    }
});