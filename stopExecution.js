document.addEventListener('DOMContentLoaded', function() {
    let abortController = null; // To manage the fetch abort

    document.getElementById('runBtn').addEventListener('click', async () => {
        try {
            // Abort any previous execution if it's still running
            if (abortController) {
                abortController.abort();
                abortController = null; // Reset abort controller
            }

            // Create a new AbortController for the current execution
            abortController = new AbortController();
            const { signal } = abortController;

            // Get the code from the Ace Editor
            const editor = ace.edit("editor");
            const code = editor.getValue();

            // Identify the language using Ace Editor's mode
            const modePath = editor.session.getMode().$id; // e.g., "ace/mode/python"
            const languageId = getLanguageIdFromMode(modePath);

            if (!languageId) {
                alert('Unsupported language detected. Please select a valid language.');
                return;
            }

            // Get the input from the input-area
            const input = document.getElementById('input-area').value;

            // Submit the code to Judge0 API
            const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314', // Replace with your Rapid API key
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: languageId,
                    stdin: input // Pass the input from the input-area
                }),
                signal: signal // Pass the abort signal
            });

            if (!submissionResponse.ok) {
                const errorData = await submissionResponse.json();
                console.error('Error Response:', errorData);
                alert(`Error: ${errorData.message || 'Failed to submit code.'}`);
                return;
            }

            const submissionData = await submissionResponse.json();
            console.log('Submission Data:', submissionData);

            if (!submissionData.token) {
                console.error('No token received from the API.');
                alert('An error occurred while submitting the code.');
                return;
            }

            const { token } = submissionData;

            // Poll the API to get the result
            let result;
            do {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before polling
                const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314', // Replace with your Rapid API key
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    },
                    signal: signal // Pass the abort signal
                });

                if (!resultResponse.ok) {
                    console.error('Polling failed:', resultResponse.statusText);
                    alert('Failed to retrieve execution results.');
                    return;
                }

                result = await resultResponse.json();
                console.log('Polling Result:', result);
            } while (result.status.id <= 2); // Status ID <= 2 means the execution is still in progress

            // Display the output or error in the output-area
            const outputArea = document.getElementById('output-area');
            if (result.stderr) {
                outputArea.value = `Error:\n${result.stderr}`;
            } else {
                outputArea.value = `Output:\n${result.stdout || 'No output'}`;
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Execution stopped by user.');
                alert('Execution stopped.');
            } else {
                console.error('Error:', error);
                alert('An unexpected error occurred. Please try again later.');
            }
        } finally {
             abortController = null; // Reset abort controller
        }
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        if (abortController) {
            abortController.abort();
            abortController = null; // Reset abort controller
        } else {
            alert('No execution is currently running.');
        }
    });

    // Helper function to map Ace Editor mode to Judge0 language IDs
    function getLanguageIdFromMode(modePath) {
        const modeMap = {
            'ace/mode/python': 71, // Python 3
            'ace/mode/java': 62,   // Java
            'ace/mode/c_cpp': 54,  // C++ (GCC)
            'ace/mode/javascript': 63, // JavaScript (Node.js)
            'ace/mode/ruby': 72,   // Ruby
            'ace/mode/php': 68,    // PHP
            'ace/mode/go': 60,     // Go
            'ace/mode/csharp': 51, // C#
            'ace/mode/perl': 57,   // Perl
            'ace/mode/rust': 73    // Rust
        };

        return modeMap[modePath];
    }
});