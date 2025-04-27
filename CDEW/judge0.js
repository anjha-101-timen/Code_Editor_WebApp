document.addEventListener('DOMContentLoaded', function() {
  const inputArea = document.getElementById('input-area');
  const outputArea = document.getElementById('output-area');
  let abortController = null;

  document.getElementById('runBtn').addEventListener('click', async () => {
      try {
          if (abortController) {
              abortController.abort();
              abortController = null;
          }
          abortController = new AbortController();
          const { signal } = abortController;

          // Apply blur only to the textarea elements
          inputArea.style.filter = 'blur(5px)';
          outputArea.style.filter = 'blur(5px)';

          // Add overlay only to the textarea elements
          addOverlay(inputArea);
          addOverlay(outputArea);

          // Display loading animation
          outputArea.innerHTML = '<div id="loading-animation" style="text-align: center; margin-top: 50px;"></div>';
          const loadingAnimation = createLoadingAnimation(document.getElementById('loading-animation'));

          const editor = ace.edit("editor");
          const code = editor.getValue();
          const modePath = editor.session.getMode().$id;
          const languageId = getLanguageIdFromMode(modePath);

          if (!languageId) {
              alert('Unsupported language detected. Please select a valid language.');
              stopLoadingAnimation(loadingAnimation);
              inputArea.style.filter = '';
              outputArea.style.filter = '';
              removeOverlay(inputArea);
              removeOverlay(outputArea);
              abortController = null;
              return;
          }

          const input = inputArea.value;

          const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314',
                  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
              },
              body: JSON.stringify({
                  source_code: code,
                  language_id: languageId,
                  stdin: input
              }),
              signal: signal
          });

          if (!submissionResponse.ok) {
              const errorData = await submissionResponse.json();
              console.error('Error Response:', errorData);
              alert(`Error: ${errorData.message || 'Failed to submit code.'}`);
              stopLoadingAnimation(loadingAnimation);
              inputArea.style.filter = '';
              outputArea.style.filter = '';
              removeOverlay(inputArea);
              removeOverlay(outputArea);
              abortController = null;
              return;
          }

          const submissionData = await submissionResponse.json();
          if (!submissionData.token) {
              console.error('No token received from the API.');
              alert('An error occurred while submitting the code.');
              stopLoadingAnimation(loadingAnimation);
              inputArea.style.filter = '';
              outputArea.style.filter = '';
              removeOverlay(inputArea);
              removeOverlay(outputArea);
              abortController = null;
              return;
          }

          const { token } = submissionData;

          let result;
          do {
              await new Promise(resolve => setTimeout(resolve, 2000));
              const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                  method: 'GET',
                  headers: {
                      'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314',
                      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                  },
                  signal: signal
              });

              if (!resultResponse.ok) {
                  console.error('Polling failed:', resultResponse.statusText);
                  alert('Failed to retrieve execution results.');
                  stopLoadingAnimation(loadingAnimation);
                  inputArea.style.filter = '';
                  outputArea.style.filter = '';
                  removeOverlay(inputArea);
                  removeOverlay(outputArea);
                  abortController = null;
                  return;
              }

              result = await resultResponse.json();
          } while (result.status.id <= 2);

          if (result.stderr) {
              outputArea.value = `Error:\n${result.stderr}`;
          } else {
              outputArea.value = `Output:\n${result.stdout || 'No output'}`;
          }

          stopLoadingAnimation(loadingAnimation);
          outputArea.innerHTML = outputArea.value;
          inputArea.style.filter = '';
          outputArea.style.filter = '';
          removeOverlay(inputArea);
          removeOverlay(outputArea);
          abortController = null;

      } catch (error) {
          if (error.name === 'AbortError') {
              console.log('Execution stopped by user.');
              alert('Execution stopped.');
          } else {
              console.error('Error:', error);
              alert('An unexpected error occurred. Please try again later.');
          }
          stopLoadingAnimation(loadingAnimation);
          inputArea.style.filter = '';
          outputArea.style.filter = '';
          removeOverlay(inputArea);
          removeOverlay(outputArea);
          abortController = null;
      }
  });

  document.getElementById('stopBtn').addEventListener('click', () => {
      if (abortController) {
          abortController.abort();
          abortController = null;
      } else {
          alert('No execution is currently running.');
      }
  });

  function getLanguageIdFromMode(modePath) {
      const modeMap = {
          'ace/mode/python': 71,
          'ace/mode/java': 62,
          'ace/mode/c_cpp': 54,
          'ace/mode/javascript': 63,
          'ace/mode/ruby': 72,
          'ace/mode/php': 68,
          'ace/mode/go': 60,
          'ace/mode/csharp': 51,
          'ace/mode/perl': 57,
          'ace/mode/rust': 73
      };
      return modeMap[modePath];
  }

  function createLoadingAnimation(loadingElement) {
      let dotCount = 1;
      const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      let colorIndex = 0;

      const intervalId = setInterval(() => {
          let loadingText = '';
          for (let i = 0; i < dotCount; i++) {
              const color = colors[(colorIndex + i) % colors.length];
              loadingText += `<span style="color: ${color};">\u25CF</span>`;
          }
          loadingElement.innerHTML = loadingText;
          dotCount = (dotCount % 5) + 1; // Cycle from 1 to 5 dots
          colorIndex = (colorIndex + 1) % colors.length;
      }, 500);

      return intervalId;
  }

  function stopLoadingAnimation(intervalId) {
      clearInterval(intervalId);
  }

  function addOverlay(element) {
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      overlay.style.zIndex = '10';
      overlay.style.pointerEvents = 'none';
      element.parentNode.appendChild(overlay);
  }

  function removeOverlay(element) {
      const overlay = element.parentNode.querySelector('div[style*="position: absolute"]');
      if (overlay) {
          overlay.remove();
      }
  }
});