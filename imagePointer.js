document.addEventListener('DOMContentLoaded', function () {
    const imagePointerButton = document.getElementById('imagePointerBtn');
    const editor = ace.edit("editor");
    const additionalInput = document.querySelector('.additional-input');
    const promptImageBtn = document.getElementById('promptImageBtn');

    const GROQ_API_KEY = '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';
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    

    // Handle image pointer button click
    imagePointerButton.addEventListener('click', async function () {
        const prompt = additionalInput.value.trim();

        // Retrieve the image from localStorage
        base64Image = localStorage.getItem('promptImage');

        // Validate image
        if (!base64Image || base64Image.trim() === "") {
            alert("Please upload an image using the prompt image button.");
            return;
        }

        // Validate prompt
        if (!prompt) {
            alert("Please enter a prompt.");
            return;
        }

        // Set placeholder text in the editor
        editor.setValue("Generating response...");

        try {
            // Retrieve the selected model from localStorage
            let selectedModel = localStorage.getItem('selectedModel') || "llama-3.2-90b-vision-preview";

            // Check if the model supports vision
            if (!selectedModel.includes("vision")) {
                alert("Image pointer button only works with Vision Models.");
                return;
            }

            // Send the request to the Groq API
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
                            role: "user",
                            content: [
                                { type: "text", text: prompt }, // User prompt
                                { type: "image_url", image_url: { url: base64Image, detail: "high" } } // Uploaded image
                            ]
                        }
                    ]
                })
            });

            // Handle API errors
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content || "Error: No valid response from API.";

            // Display the result in the Ace Editor
            editor.setValue(result);

        } catch (error) {
            console.error('Groq Vision Error:', error);
            editor.setValue("Error: Failed to generate response.");
        }
    });
});