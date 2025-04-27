document.addEventListener('DOMContentLoaded', function () {
    const grokAPIKeyBtn = document.getElementById('grokAPIKeyBtn');
  
    grokAPIKeyBtn.addEventListener('click', function () {
      createApiKeyBox();
    });
  
    let boxContainer = null; // Store the box container globally
  
    function createApiKeyBox() {
      if (boxContainer) {
        // If the box already exists, do nothing
        return;
      }
  
      // Create the overlay for modal-like effect
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      overlay.style.zIndex = '999';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease-in-out';
  
      // Create the box container
      boxContainer = document.createElement('div');
      boxContainer.style.position = 'relative';
      boxContainer.style.width = '450px';
      boxContainer.style.maxWidth = '90%';
      boxContainer.style.backgroundColor = '#ffffff';
      boxContainer.style.borderRadius = '16px';
      boxContainer.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
      boxContainer.style.padding = '30px';
      boxContainer.style.transform = 'scale(0.9)';
      boxContainer.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
      boxContainer.style.opacity = '0';
  
      // Add animation after appending to the DOM
      setTimeout(() => {
        overlay.style.opacity = '1';
        boxContainer.style.transform = 'scale(1)';
        boxContainer.style.opacity = '1';
      }, 10);
  
      // Create the close button
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '15px';
      closeButton.style.right = '15px';
      closeButton.style.border = 'none';
      closeButton.style.backgroundColor = 'transparent';
      closeButton.style.fontSize = '24px';
      closeButton.style.color = '#999999';
      closeButton.style.cursor = 'pointer';
      closeButton.style.transition = 'color 0.2s ease-in-out';
      closeButton.onmouseover = () => (closeButton.style.color = '#ff4d4d');
      closeButton.onmouseout = () => (closeButton.style.color = '#999999');
  
      // Create the heading
      const heading = document.createElement('h2');
      heading.textContent = 'Enter Grok API Key';
      heading.style.marginBottom = '20px';
      heading.style.fontSize = '20px';
      heading.style.fontWeight = '600';
      heading.style.color = '#333333';
      heading.style.textAlign = 'center';
  
      // Create the input field
      const apiKeyInput = document.createElement('input');
      apiKeyInput.type = 'text';
      apiKeyInput.id = 'grokApiKeyInputBox';
      apiKeyInput.placeholder = 'Enter your API Key here';
      apiKeyInput.style.width = '100%';
      apiKeyInput.style.padding = '12px';
      apiKeyInput.style.border = '1px solid #e0e0e0';
      apiKeyInput.style.borderRadius = '8px';
      apiKeyInput.style.fontSize = '14px';
      apiKeyInput.style.outline = 'none';
      apiKeyInput.style.transition = 'border-color 0.2s ease-in-out';
      apiKeyInput.onfocus = () => (apiKeyInput.style.borderColor = '#007bff');
      apiKeyInput.onblur = () => (apiKeyInput.style.borderColor = '#e0e0e0');
  
      // Create the save button
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save API Key';
      saveButton.style.marginTop = '20px';
      saveButton.style.padding = '12px 24px';
      saveButton.style.backgroundColor = '#007bff';
      saveButton.style.color = '#ffffff';
      saveButton.style.border = 'none';
      saveButton.style.borderRadius = '8px';
      saveButton.style.cursor = 'pointer';
      saveButton.style.fontSize = '14px';
      saveButton.style.transition = 'background-color 0.2s ease-in-out';
      saveButton.onmouseover = () => (saveButton.style.backgroundColor = '#0056b3');
      saveButton.onmouseout = () => (saveButton.style.backgroundColor = '#007bff');
  
      // Create the display area
      const apiKeyDisplay = document.createElement('div');
      apiKeyDisplay.id = 'apiKeyDisplayBox';
      apiKeyDisplay.style.marginTop = '20px';
      apiKeyDisplay.style.padding = '12px';
      apiKeyDisplay.style.border = '1px solid #f0f0f0';
      apiKeyDisplay.style.backgroundColor = '#f9f9f9';
      apiKeyDisplay.style.borderRadius = '8px';
      apiKeyDisplay.style.fontSize = '14px';
      apiKeyDisplay.style.textAlign = 'center';
      apiKeyDisplay.style.color = '#555555';
  
      // Append elements to the box container
      boxContainer.appendChild(closeButton);
      boxContainer.appendChild(heading);
      boxContainer.appendChild(apiKeyInput);
      boxContainer.appendChild(saveButton);
      boxContainer.appendChild(apiKeyDisplay);
  
      // Append the box container and overlay to the body
      overlay.appendChild(boxContainer);
      document.body.appendChild(overlay);
  
      function updateDisplay(key) {
        apiKeyDisplay.textContent = key ? `Current API Key: ${key}` : 'No API Key Saved';
      }
  
      function loadApiKey() {
        const storedKey = localStorage.getItem('grokApiKey');
        if (storedKey) {
          apiKeyInput.value = storedKey;
          updateDisplay(storedKey);
        } else {
          updateDisplay(null);
        }
      }
  
      loadApiKey();
  
      saveButton.addEventListener('click', function () {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
          localStorage.setItem('grokApiKey', apiKey);
          updateDisplay(apiKey);
        } else {
          const defaultKey = "0000000000000000000000000";
          localStorage.setItem('grokApiKey', defaultKey);
          apiKeyInput.value = defaultKey;
          updateDisplay(defaultKey);
        }
  
        // Trigger two page refreshes
        setTimeout(() => {
          location.reload(); // First refresh
          setTimeout(() => {
            location.reload(); // Second refresh
          }, 1000); // Wait 1 second before the second refresh
        }, 1000); // Wait 1 second before the first refresh
      });
  
      closeButton.addEventListener('click', function () {
        boxContainer.style.transform = 'scale(0.9)';
        boxContainer.style.opacity = '0';
        overlay.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(overlay);
          boxContainer = null; // Reset the global variable
        }, 300); // Match the animation duration
      });
    }
  });