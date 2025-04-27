// Initialize the Ace Editor
const editor = ace.edit("editor");

// Get the theme change button
const themeChangeBtn = document.getElementById("debugBtn");

// Comprehensive list of Ace Editor themes
const themes = [
    "chrome", "clouds", "crimson_editor", "dawn", "dreamweaver",
    "eclipse", "github", "iplastic", "katzenmilch", "kuroir",
    "merbivore", "merbivore_soft", "mono_industrial", "monokai",
    "pastel_on_dark", "solarized_dark", "solarized_light", "sqlserver",
    "terminal", "textmate", "tomorrow", "tomorrow_night",
    "tomorrow_night_blue", "tomorrow_night_bright", "tomorrow_night_eighties",
    "vibrant_ink"
];

// Function to initialize the theme from local storage
function initializeTheme() {
    const savedTheme = localStorage.getItem("aceEditorTheme");
    const defaultTheme = "chrome"; // Default theme if none is saved

    if (savedTheme && themes.includes(savedTheme)) {
        // Apply the saved theme if it exists and is valid
        applyTheme(savedTheme);
    } else {
        // Set default theme if no valid theme is saved
        applyTheme(defaultTheme);
        localStorage.setItem("aceEditorTheme", defaultTheme);
    }
}

// Function to apply a specific theme
function applyTheme(themeName) {
    editor.setTheme(`ace/theme/${themeName}`);
    themeChangeBtn.textContent = formatThemeName(themeName); // Update button text
}

// Helper function to format the theme name for display
function formatThemeName(themeName) {
    return themeName
        .split("_") // Split by underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join with spaces
}

// Function to cycle through themes
let currentThemeIndex = 0;

themeChangeBtn.addEventListener("click", () => {
    // Move to the next theme in the list
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const selectedTheme = themes[currentThemeIndex];

    // Apply the new theme to the editor
    applyTheme(selectedTheme);

    // Save the selected theme to local storage
    localStorage.setItem("aceEditorTheme", selectedTheme);
});

// Initialize the theme on page load
document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the saved theme index from local storage
    const savedTheme = localStorage.getItem("aceEditorTheme");
    if (savedTheme && themes.includes(savedTheme)) {
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    // Initialize the theme
    initializeTheme();
});