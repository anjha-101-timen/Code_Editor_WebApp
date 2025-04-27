document.addEventListener('DOMContentLoaded', function() {
    const inputExecuteAIButton = document.getElementById('inputExecuteAI');
    const editor = ace.edit("editor");
    const inputArea = document.getElementById('input-area');
    const outputArea = document.getElementById('output-area');

    const GROQ_API_KEY = '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'; // Replace with your actual API key
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    inputExecuteAIButton.addEventListener('click', async function() {
        const code = editor.getValue();
        const output = outputArea.value;

        if (!code) {
            alert("Please enter code in the editor.");
            return;
        }

        inputArea.value = "Generating input with AI...";

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
                            content: `You are an input generator. Based on the code and its output, generate suitable input that would produce the given output. If the code is not executable or the output is not relevant, make a valid input for the given code. If the code does not require input, write "No input required".`
                        },
                        {
                            role: "user",
                            content: `Code:\n\`\`\`\n${code}\n\`\`\`\nOutput:\n\`\`\`\n${output}\n\`\`\``
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content || "Error: No valid response from API.";

            inputArea.value = result;

        } catch (error) {
            console.error('Input Generation Error:', error);
            inputArea.value = "Error: Failed to generate input.";
        }
    });
});