document.addEventListener('DOMContentLoaded', function() {
    const runAIButton = document.getElementById('runAI');
    const editor = ace.edit("editor");
    const inputArea = document.getElementById('input-area');
    const outputArea = document.getElementById('output-area');

    const GROQ_API_KEY = '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'; // Replace with your actual API key
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    runAIButton.addEventListener('click', async function() {
        const code = editor.getValue();
        const input = inputArea.value;

        if (!code) {
            alert("Please enter code in the editor.");
            return;
        }

        outputArea.value = "Running code with AI...";

        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile", // Or another suitable model
                    messages: [
                        {
                            role: "system",
                            content: `You are a code execution engine. Execute the following code with the given input and provide the output. If the code produces an error, provide the error message. If there is no output, write nothing. Give the output just as a compiler or interpreter gives. It should not be seems to be ai generated`
                        },
                        {
                            role: "user",
                            content: `Code:\n\`\`\`\n${code}\n\`\`\`\nInput:\n\`\`\`\n${input}\n\`\`\``
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content || "Error: No valid response from API.";

            outputArea.value = result;

        } catch (error) {
            console.error('Execution Error:', error);
            outputArea.value = "Error: Failed to execute code.";
        }
    });
});