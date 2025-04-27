document.addEventListener("DOMContentLoaded", () => {
    const tabHeader = document.querySelector(".tab-header");
    const editorTabs = document.getElementById("editor-tabs");
    const addTabBtn = document.querySelector(".add-tab-btn");

    let tabCounter = 1;

    // Function to create a new tab
    function createTab() {
        const tabId = `tab-${tabCounter}`;
        const tabName = `File ${tabCounter}`;

        // Create tab button
        const tabButton = document.createElement("button");
        tabButton.textContent = tabName;
        tabButton.dataset.tabId = tabId;
        tabButton.classList.add("tab-button");

        // Add click event to switch tabs
        tabButton.addEventListener("click", () => switchTab(tabId));

        // Append tab button to header
        tabHeader.insertBefore(tabButton, addTabBtn);

        // Create tab content
        const tabContent = document.createElement("div");
        tabContent.id = tabId;
        tabContent.classList.add("tab-content");

        // Initialize Ace Editor in the tab content
        const editorDiv = document.createElement("div");
        editorDiv.style.height = "100%";
        editorDiv.style.width = "100%";
        tabContent.appendChild(editorDiv);

        const editor = ace.edit(editorDiv);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");

        // Store editor instance in dataset
        tabContent.dataset.editor = editor;

        // Append tab content to editor-tabs
        editorTabs.appendChild(tabContent);

        // Switch to the new tab
        switchTab(tabId);

        tabCounter++;
    }

    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
        });

        // Show the selected tab content
        const selectedTabContent = document.getElementById(tabId);
        if (selectedTabContent) {
            selectedTabContent.classList.add("active");
        }

        // Highlight the selected tab button
        document.querySelectorAll(".tab-button").forEach((button) => {
            button.style.backgroundColor = "#3a3a3a";
        });

        const selectedTabButton = document.querySelector(`.tab-button[data-tab-id="${tabId}"]`);
        if (selectedTabButton) {
            selectedTabButton.style.backgroundColor = "#4a4a4a";
        }
    }

    // Add tab button click event
    addTabBtn.addEventListener("click", createTab);

    // Create the first tab on page load
    createTab();
});