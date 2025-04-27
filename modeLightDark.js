// modeLightDark.js

document.addEventListener('DOMContentLoaded', function() {
    const modeLightDarkBtn = document.getElementById('modeLightDarkBtn');
    const body = document.body;
    const container = document.querySelector('.container');
    const topBar = document.querySelector('.top-bar');
    const topButtons = document.querySelectorAll('.top-button');
    const sideBar = document.querySelector('.side-bar');
    const sideButtons = document.querySelectorAll('.side-button');
    const editorContainer = document.querySelector('.editor-container');
    const editorArea = document.querySelector('.editor-area');
    const inputArea = document.querySelector('.input-area');
    const outputArea = document.querySelector('.output-area');
    const inputLabel = document.querySelector('.input-label');
    const outputLabel = document.querySelector('.output-label');
    const inputButtons = document.querySelectorAll('.input-button');
    const outputButtons = document.querySelectorAll('.output-button');
    const inputBtns = document.querySelectorAll('.intput-btn');
    const outputBtns = document.querySelectorAll('.output-btn');
    const editorLabel = document.querySelector('.editor-label');

    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    function applyTheme(darkMode) {
        if (darkMode) {
            body.style.backgroundColor = '#1a1a1a';
            body.style.color = '#d4d4d4';
            container.style.backgroundColor = '#1a1a1a';
            topBar.style.background = 'linear-gradient(to right, white, black, white)';
            topButtons.forEach(button => {
                button.style.background = 'linear-gradient(to right, #353535, #101010, #353535)';
                button.style.color = '#d4d4d4';
            });
            sideBar.style.background = 'linear-gradient(to bottom, black, white, black)';
            sideButtons.forEach(button => {
                button.style.background = 'linear-gradient(to bottom, black, white, black)';
            });
            editorContainer.style.backgroundColor = '#202020';
            editorArea.style.backgroundColor = '#202020';
            inputArea.style.background = 'linear-gradient(135deg, #2a2a2a, #1e1e1e)';
            outputArea.style.background = 'linear-gradient(135deg, #2a2a2a, #1e1e1e)';
            inputLabel.style.backgroundColor = '#ffffff';
            inputLabel.style.color = '#000000';
            outputLabel.style.backgroundColor = '#ffffff';
            outputLabel.style.color = '#000000';
            inputButtons.forEach(button => {
                button.style.background = 'linear-gradient(90deg, #90EE90, #228B22)';
                button.style.color = 'white';
            });
            outputButtons.forEach(button => {
                button.style.background = 'linear-gradient(90deg, #ADD8E6, #00008B)';
                button.style.color = 'white';
            });
            inputBtns.forEach(button => {
                button.style.backgroundColor = 'transparent';
            });
            outputBtns.forEach(button => {
                button.style.backgroundColor = 'transparent';
            });
            editorLabel.style.backgroundColor = '#ffffff';
            editorLabel.style.color = '#000000';

        } else {
            body.style.backgroundColor = '#f0f0f0';
            body.style.color = '#333';
            container.style.backgroundColor = '#f0f0f0';
            topBar.style.background = 'linear-gradient(to right, #e0e0e0, #a0a0a0, #e0e0e0)';
            topButtons.forEach(button => {
                button.style.background = 'linear-gradient(to right, #e8e8e8, #c0c0c0, #e8e8e8)';
                button.style.color = '#333';
            });
            sideBar.style.background = 'linear-gradient(to bottom, #a0a0a0, #e0e0e0, #a0a0a0)';
            sideButtons.forEach(button => {
                button.style.background = 'linear-gradient(to bottom, #a0a0a0, #e0e0e0, #a0a0a0)';
            });
            editorContainer.style.backgroundColor = '#e0e0e0';
            editorArea.style.backgroundColor = '#e0e0e0';
            inputArea.style.background = 'linear-gradient(135deg, #d0d0d0, #c8c8c8)';
            outputArea.style.background = 'linear-gradient(135deg, #d0d0d0, #c8c8c8)';
            inputLabel.style.backgroundColor = '#ffffff';
            inputLabel.style.color = '#000000';
            outputLabel.style.backgroundColor = '#ffffff';
            outputLabel.style.color = '#000000';
            inputButtons.forEach(button => {
                button.style.background = 'linear-gradient(90deg, #90EE90, #228B22)';
                button.style.color = 'white';
            });
            outputButtons.forEach(button => {
                button.style.background = 'linear-gradient(90deg, #ADD8E6, #00008B)';
                button.style.color = 'white';
            });
            inputBtns.forEach(button => {
                button.style.backgroundColor = 'transparent';
            });
            outputBtns.forEach(button => {
                button.style.backgroundColor = 'transparent';
            });
            editorLabel.style.backgroundColor = '#ffffff';
            editorLabel.style.color = '#000000';
        }
    }

    applyTheme(isDarkMode);

    modeLightDarkBtn.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        applyTheme(isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    });
});