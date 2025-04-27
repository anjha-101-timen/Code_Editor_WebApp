document.addEventListener("DOMContentLoaded", () => {
    const editor = ace.edit("editor"); // Ace editor instance
    const userChoiceTextBtn = document.getElementById("userChoiceTextBtn");

    // Create userText dynamically
    const userText = document.createElement("div");
    userText.classList.add("userText");
    userText.innerHTML = `
        <div class="userText-content">
            <button class="cross-btn">&times;</button>
            <h2>Download Code Range</h2>
            <input type="text" id="file-title" placeholder="File Title" />
            <input type="text" id="file-end-title" placeholder="File End Title" />
            <div id="line-inputs-container"></div>
            <button id="add-line-btn">Add Line Range</button>
            <div class="separator-options">
                <label>
                    Separator:
                    <select id="separator-type">
                        <option value="default">Default (Blank Line)</option>
                        <option value="dots">...........</option>
                        <option value="dashes">------------</option>
                        <option value="equals">===========</option>
                        <option value="colons">::::::::::::</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <div id="custom-separator" style="display: none;">
                    <input type="text" id="custom-char" placeholder="Character/String" />
                    <input type="number" id="custom-multiplier" placeholder="Multiplier" min="1" />
                </div>
            </div>
            <input type="text" id="file-name" placeholder="File Name" />
            <input type="text" id="file-extension" placeholder="Extension (e.g., .txt)" />
            <button class="download-user-text-btn" id="download-user-text-btn">Download</button>
        </div>
    `;
    document.body.appendChild(userText);

    const closeUserText = () => {
        userText.style.display = "none";
    };

    // Close userText on close button click
    userText.querySelector(".cross-btn").addEventListener("click", closeUserText);

    // Toggle custom separator inputs
    const separatorType = document.getElementById("separator-type");
    const customSeparatorDiv = document.getElementById("custom-separator");
    separatorType.addEventListener("change", () => {
        if (separatorType.value === "custom") {
            customSeparatorDiv.style.display = "block";
        } else {
            customSeparatorDiv.style.display = "none";
        }
    });

    // Add line range input
    let lineInputCount = 0;
    const addLineInput = () => {
        const container = document.getElementById("line-inputs-container");
        const lineInputDiv = document.createElement("div");
        lineInputDiv.classList.add("line-input-container");
        lineInputDiv.innerHTML = `
            <input type="number" class="start-line" placeholder="Start Line" />
            <input type="number" class="end-line" placeholder="End Line" />
            <input type="text" class="start-title" placeholder="Start Title" />
            <input type="text" class="end-title" placeholder="End Title" />
            <button class="remove-line-btn">Remove</button>
            <button class="update-line-btn">Update</button>
        `;
        container.appendChild(lineInputDiv);

        // Remove line input
        lineInputDiv.querySelector(".remove-line-btn").addEventListener("click", () => {
            lineInputDiv.remove();
        });

        // Update line input
        lineInputDiv.querySelector(".update-line-btn").addEventListener("click", () => {
            const startLine = lineInputDiv.querySelector(".start-line").value;
            const endLine = lineInputDiv.querySelector(".end-line").value;
            const startTitle = lineInputDiv.querySelector(".start-title").value;
            const endTitle = lineInputDiv.querySelector(".end-title").value;
            if (startLine && endLine && startTitle && endTitle) {
                alert(`Updated range: ${startLine} to <span class="math-inline">\{endLine\} with titles "</span>{startTitle}" and "${endTitle}"`);
            } else {
                alert("Please enter valid line numbers and titles.");
            }
        });
    };

    // Add line range button
    userText.querySelector("#add-line-btn").addEventListener("click", addLineInput);

    // Download button logic
    userText.querySelector("#download-user-text-btn").addEventListener("click", () => {
        const fileTitle = document.getElementById("file-title").value;
        const fileEndTitle = document.getElementById("file-end-title").value; // New: File End Title
        const fileName = document.getElementById("file-name").value;
        const fileExtension = document.getElementById("file-extension").value;
        const separatorTypeValue = separatorType.value;
        const customChar = document.getElementById("custom-char").value;
        const customMultiplier = parseInt(document.getElementById("custom-multiplier").value);

        if (!fileTitle || !fileEndTitle || !fileName || !fileExtension) { // Validate end title
            alert("Please enter a file title, end title, name, and extension.");
            return;
        }

        let separator = "\n"; // Default separator
        if (separatorTypeValue === "dots") {
            separator = ".".repeat(50);
        } else if (separatorTypeValue === "dashes") {
            separator = "-".repeat(50);
        } else if (separatorTypeValue === "equals") {
            separator = "=".repeat(50);
        } else if (separatorTypeValue === "colons") {
            separator = ":".repeat(50);
        } else if (separatorTypeValue === "custom" && customChar && customMultiplier > 0) {
            separator = customChar.repeat(customMultiplier);
        }

        const ranges = [];
        const lineInputs = document.querySelectorAll(".line-input-container");
        lineInputs.forEach((lineInput) => {
            const startLine = parseInt(lineInput.querySelector(".start-line").value);
            const endLine = parseInt(lineInput.querySelector(".end-line").value);
            const startTitle = lineInput.querySelector(".start-title").value;
            const endTitle = lineInput.querySelector(".end-title").value;
            if (startLine && endLine && startTitle && endTitle && startLine <= endLine) {
                ranges.push({ start: startLine, end: endLine, startTitle, endTitle });
            }
        });

        if (ranges.length === 0) {
            alert("Please enter valid line ranges and titles.");
            return;
        }

        // Extract code from editor
        const codeLines = editor.getValue().split("\n");
        let extractedCode = `${fileTitle}\n\n`; // Start with file title
        ranges.forEach(({ start, end, startTitle, endTitle }) => {
            const startIdx = Math.max(0, start - 1); // Convert to zero-based index
            const endIdx = Math.min(codeLines.length - 1, end - 1);
            extractedCode += `<span class="math-inline">\{startTitle\}\\n</span>{codeLines.slice(startIdx, endIdx + 1).join("\n")}\n${endTitle}\n${separator}\n`;
        });

        // Remove trailing separator
        extractedCode = extractedCode.trim();

        // Add file end title
        extractedCode += `\n\n${fileEndTitle}`; // Append file end title

        // Create and download file
        const blob = new Blob([extractedCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `<span class="math-inline">\{fileName\}</span>{fileExtension}`;
        a.click();
        URL.revokeObjectURL(url);

        closeUserText();
    });

    // Open userText on button click
    userChoiceTextBtn.addEventListener("click", () => {
        userText.style.display = "block";
    });
});