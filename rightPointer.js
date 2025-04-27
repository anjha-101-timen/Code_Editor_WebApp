document.addEventListener('DOMContentLoaded', function() {
    const rightPointerButton = document.getElementById('rightPointerBtn');
    const editor = ace.edit("editor");
    const additionalInput = document.querySelector('.additional-input');

    const GROQ_API_KEY = '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';
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    rightPointerButton.addEventListener('click', async function() {
        const problem = additionalInput.value;

        if (!problem) {
            alert("Please enter a coding problem in the input field.");
            return;
        }

        // Create overlay for editor
        const editorOverlay = document.createElement('div');
        editorOverlay.style.position = 'absolute';
        editorOverlay.style.top = '0';
        editorOverlay.style.left = '0';
        editorOverlay.style.width = '100%';
        editorOverlay.style.height = '100%';
        editorOverlay.style.zIndex = '1000'; // Below the loading overlay
        editor.container.appendChild(editorOverlay);

        // Create loading overlay for dots
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.position = 'absolute';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.zIndex = '1001'; // Above the editor overlay
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.3s ease';

        // Create dotted loading animation with rainbow colors
        const dotsContainer = document.createElement('div');
        dotsContainer.style.display = 'flex';

        const rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.style.width = '8px';
            dot.style.height = '8px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = rainbowColors[i % rainbowColors.length];
            dot.style.margin = '0 4px';
            dot.style.opacity = '0.3';
            dot.style.transition = 'opacity 0.5s ease';
            dotsContainer.appendChild(dot);
        }

        // Append dots to loading overlay
        loadingOverlay.appendChild(dotsContainer);
        editor.container.appendChild(loadingOverlay);

        // Animate overlay in and dots
        setTimeout(() => {
            loadingOverlay.style.opacity = '1';

            let dotIndex = 0;
            const animateDots = () => {
                const dots = dotsContainer.children;
                for (let i = 0; i < dots.length; i++) {
                    dots[i].style.opacity = i <= dotIndex ? '1' : '0.3';
                }
                dotIndex = (dotIndex + 1) % dots.length;
                setTimeout(animateDots, 500);
            };
            animateDots();
        }, 10);

        editor.setValue("Generating code...");
        editorOverlay.style.filter = 'blur(5px)'; // Apply blur to editor overlay

        try {
            let selectedModel = localStorage.getItem('selectedModel') || "llama-3.3-70b-versatile";

            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: [
                        {
                            role: "system",
                            content: `You are a code generator. Write code that solves the given problem. Provide the code without any additional explanations or surrounding text. Only provide the code itself. If the problem is not a coding problem, state that it is not a coding problem.`
                        },
                        {
                            role: "user",
                            content: problem
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content || "Error: No valid response from API.";

            editor.setValue(result);

        } catch (error) {
            console.error('Code Generation Error:', error);
            editor.setValue("Error: Failed to generate code.");
        } finally {
            // Animate overlay out and remove
            loadingOverlay.style.opacity = '0';
            editorOverlay.style.filter = 'blur(0px)'; // Remove blur from editor overlay
            setTimeout(() => {
                editor.container.removeChild(loadingOverlay);
                editor.container.removeChild(editorOverlay);
            }, 300);
        }
    });
});