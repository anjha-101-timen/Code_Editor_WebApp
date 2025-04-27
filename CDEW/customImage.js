document.addEventListener('DOMContentLoaded', function() {
    const editor = ace.edit("editor");

    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 'w') {
            takeSelectedScreenshot();
        }
    });

    function takeSelectedScreenshot() {
        const selection = editor.getSelectionRange();
        const selectedText = editor.session.getTextRange(selection);

        if (!selectedText) {
            alert("Please select some code.");
            return;
        }

        const session = editor.getSession();
        const renderer = editor.renderer;
        const lineHeight = renderer.lineHeight;
        const charWidth = renderer.characterWidth;
        const scale = 2;

        const selectedLines = selectedText.split('\n');
        const maxWidth = Math.max(...selectedLines.map(line => line.length * charWidth));

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const fullHeight = selectedLines.length * lineHeight;

        canvas.width = maxWidth * scale;
        canvas.height = fullHeight * scale;
        context.scale(scale, scale);

        context.fillStyle = renderer.$textLayer.$bgcolor;
        context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

        let yOffset = 0;
        selectedLines.forEach((line, index) => {
            const row = selection.start.row + index;
            const tokens = session.getTokens(row);
            let x = 0;

            tokens.forEach(token => {
                if (token.type) { //check if token.type exist.
                    const color = renderer.$textLayer.$getStyle(token.type);
                    context.fillStyle = color;
                    context.fillText(token.value, x, lineHeight * (index + 1));
                    x += token.value.length * charWidth;
                } else{
                    context.fillStyle = renderer.$textLayer.$getStyle('text');
                    context.fillText(token.value, x, lineHeight * (index + 1));
                    x += token.value.length * charWidth;
                }
            });

            yOffset += lineHeight;
        });

        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            iframe.src = url;
            iframe.contentWindow.location.assign(url);

            setTimeout(function() {
                document.body.removeChild(iframe);
                URL.revokeObjectURL(url);
            }, 1000);
        }, 'image/png');
    }
});