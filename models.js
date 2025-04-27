// models.js

import { GROQ_API_KEY } from './config.js'; // Import API key from config.js

document.addEventListener('DOMContentLoaded', function () {
    const modelBtn = document.getElementById('modelBtn');
    const editor = ace.edit("editor");

    const GROQ_MODELS_URL = 'https://api.groq.com/openai/v1/models';

    let selectedModel = localStorage.getItem('selectedModel') || "llama-3.3-70b-versatile";

    async function fetchModels() {
        try {
            const response = await fetch(GROQ_MODELS_URL, {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data.data.map(model => model.id);
        } catch (error) {
            console.error('Error fetching models:', error);
            return [];
        }
    }

    async function createSelectMenu() {
        const models = await fetchModels();

        // Add a backdrop for the modal
        const backdrop = document.createElement('div');
        backdrop.id = 'backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-in-out;
        `;
        document.body.appendChild(backdrop);

        // Create the modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modelSelectModal';
        modalContainer.style.cssText = `
            position: relative;
            width: 400px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideUp 0.4s ease-in-out;
        `;

        // Add a title for the modal
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Select a Model';
        modalTitle.style.cssText = `
            margin-bottom: 15px;
            font-size: 18px;
            color: #333;
            text-align: center;
        `;
        modalContainer.appendChild(modalTitle);

        // Show the currently selected model
        const currentSelection = document.createElement('p');
        currentSelection.textContent = `Current Selection: ${selectedModel}`;
        currentSelection.style.cssText = `
            margin-bottom: 15px;
            font-size: 14px;
            color: #555;
            text-align: center;
        `;
        modalContainer.appendChild(currentSelection);

        // Create the select dropdown
        const modelSelect = document.createElement('select');
        modelSelect.style.cssText = `
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 15px;
            background-color: #f9f9f9;
            outline: none;
            transition: border-color 0.3s ease;
        `;
        modelSelect.addEventListener('focus', () => {
            modelSelect.style.borderColor = '#4CAF50';
        });
        modelSelect.addEventListener('blur', () => {
            modelSelect.style.borderColor = '#ddd';
        });

        // Add placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = '-- Select a Model --';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        modelSelect.appendChild(placeholderOption);

        // Add fetched models as options
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            if (model === selectedModel) {
                option.selected = true; // Highlight the currently selected model
            }
            modelSelect.appendChild(option);
        });
        modalContainer.appendChild(modelSelect);

        // Create OK and Cancel buttons container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            justify-content: space-between;
            width: 100%;
        `;

        // OK Button
        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.cssText = `
            flex: 1;
            padding: 10px;
            font-size: 14px;
            color: #fff;
            background-color: #4CAF50;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-right: 10px;
            transition: background-color 0.3s ease;
        `;
        okButton.addEventListener('mouseover', () => {
            okButton.style.backgroundColor = '#45a049';
        });
        okButton.addEventListener('mouseout', () => {
            okButton.style.backgroundColor = '#4CAF50';
        });
        okButton.addEventListener('click', () => {
            if (modelSelect.value) {
                selectedModel = modelSelect.value;
                localStorage.setItem('selectedModel', selectedModel);
                closeModal(modalContainer, backdrop);
            } else {
                alert('Please select a model.');
            }
        });
        buttonContainer.appendChild(okButton);

        // Cancel Button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.cssText = `
            flex: 1;
            padding: 10px;
            font-size: 14px;
            color: #fff;
            background-color: #f44336;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;
        cancelButton.addEventListener('mouseover', () => {
            cancelButton.style.backgroundColor = '#e53935';
        });
        cancelButton.addEventListener('mouseout', () => {
            cancelButton.style.backgroundColor = '#f44336';
        });
        cancelButton.addEventListener('click', () => {
            closeModal(modalContainer, backdrop);
        });
        buttonContainer.appendChild(cancelButton);

        modalContainer.appendChild(buttonContainer);

        // Append the modal to the backdrop
        backdrop.appendChild(modalContainer);
    }

    function closeModal(modalContainer, backdrop) {
        modalContainer.style.animation = 'slideUpOut 0.4s ease-in-out forwards';
        backdrop.style.animation = 'fadeOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            document.body.removeChild(backdrop);
        }, 400); // Match the duration of the fadeOut animation
    }

    modelBtn.addEventListener('click', async function () {
        createSelectMenu();
    });

    // CSS Animations
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUpOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
});