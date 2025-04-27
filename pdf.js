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
      tempDiv.style.top = '-9999px';
      tempDiv.style.padding = '15px'; // Medium padding
      tempDiv.style.backgroundColor = '#272822';
      tempDiv.style.color = '#f8f8f2';
      tempDiv.style.fontFamily = 'monospace';
      tempDiv.style.fontSize = '15px'; // Medium font size
      tempDiv.style.whiteSpace = 'pre';
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
          const width = line.scrollWidth;
          if (width > maxWidth) {
              maxWidth = width;
          }
      });

      return maxWidth + 30; // Medium padding
  }

  // Function to capture the screenshot
  async function captureCustomScreenshot(editor, startLine, endLine, scale = 1.75) { // Medium scale
      const highlightedCode = getHighlightedCode(editor, startLine, endLine);
      const tempDiv = createTemporaryElement(highlightedCode);

      // Calculate the width of the longest line
      const maxWidth = calculateMaxWidth(tempDiv);

      // Set the width of the temporary div
      tempDiv.style.width = `${maxWidth}px`;

      // Scale up the temporary element for higher resolution
      tempDiv.style.transform = `scale(${scale})`;
      tempDiv.style.transformOrigin = 'top left';

      // Capture the screenshot using html2canvas with medium quality
      const canvas = await html2canvas(tempDiv, {
          scale: scale,
          useCORS: true,
          allowTaint: false,
          logging: false,
      });

      // Remove the temporary DOM element
      document.body.removeChild(tempDiv);

      return canvas.toDataURL('image/jpeg', 0.9); // Use JPEG with medium quality
  }

  // PDF functionality
  const pdfBtn = document.getElementById('pdfBtn');

  pdfBtn.addEventListener('click', async function () {
      const totalLines = editor.session.getLength();
      const imageData = await captureCustomScreenshot(editor, 0, totalLines - 1, 1.75); // Medium scale

      const { jsPDF } = window.jspdf;
      const img = new Image();
      img.src = imageData;

      img.onload = () => {
          const a4Width = 210; // mm
          const a4Height = 297; // mm
          const dpi = 96; // Standard DPI
          const a4WidthPx = (a4Width / 25.4) * dpi;
          const a4HeightPx = (a4Height / 25.4) * dpi;

          const doc = new jsPDF({
              orientation: 'p',
              unit: 'px',
              format: [a4WidthPx, a4HeightPx]
          });

          // Scale the image to fit A4
          const imgWidth = img.width;
          const imgHeight = img.height;
          const aspectRatio = imgWidth / imgHeight;

          let drawWidth = a4WidthPx;
          let drawHeight = a4WidthPx / aspectRatio;

          if (drawHeight > a4HeightPx) {
              drawHeight = a4HeightPx;
              drawWidth = a4HeightPx * aspectRatio;
          }

          const xOffset = (a4WidthPx - drawWidth) / 2;
          const yOffset = (a4HeightPx - drawHeight) / 2;

          doc.addImage(imageData, 'JPEG', xOffset, yOffset, drawWidth, drawHeight);
          doc.save('code_screenshot_a4.pdf');
      }
  });
});