

document.addEventListener('DOMContentLoaded', function() {
    const editor = ace.edit("editor");

    const GROQ_API_KEY = `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`; // Replace with your actual API key
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    document.addEventListener('keydown', async function(event) {
        if (event.altKey && event.key === 'j') {
            const selectedText = editor.getSelectedText();

            if (selectedText) {
                editor.getSession().off('change', arguments.callee); // Remove listener temporarily

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
                                    content: `You are an AI assistant. You will receive a query inside <anj> tags. You will respond to the query inside the same <anj> tags. If the query is related to coding, provide the code without any additional explanations or surrounding text. Only provide the code itself. If the query is not a coding problem, answer the question as accurately as possible. if you do not know the answer, respond with "I do not know"`
                                },
                                {
                                    role: "user",
                                    content: selectedText
                                }
                            ]
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
                    }

                    const data = await response.json();
                    const result = data.choices?.[0]?.message?.content || "Error: No valid response from API.";

                    editor.getSession().replace(editor.getSelectionRange(), `${result}`); // Replace selection with result

                } catch (error) {
                    console.error('AI Response Error:', error);
                    editor.getSession().replace(editor.getSelectionRange(), "Error: Failed to get response."); // Replace selection with error
                }

                editor.getSession().on('change', arguments.callee); // Re-add listener
            }
        }
    });
});