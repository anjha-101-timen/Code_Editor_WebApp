document.getElementById('themeChangeBtn').addEventListener('click', async () => {
    try {
        console.log('Debug process started.');

        const editor = ace.edit("editor");
        const code = editor.getValue();
        console.log('Code retrieved:', code);

        const modePath = editor.session.getMode().$id;
        console.log('Editor mode path:', modePath);

        const languageId = getLanguageIdFromMode(modePath);
        if (!languageId) {
            alert('Unsupported language detected. Please select a valid language.');
            return;
        }
        console.log('Language ID:', languageId);

        const input = inputArea.value;
        console.log('Input value:', input);

        // Add compiler options only for supported languages
        const supportsDebugging = ['54', '62'].includes(languageId.toString());
        const compilerOptions = supportsDebugging ? '-g -Wall' : '';
        console.log('Compiler options:', compilerOptions);

        console.log('Sending code to Judge0 API...');
        const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                source_code: code,
                language_id: languageId,
                stdin: input,
                compiler_options: compilerOptions
            })
        });

        console.log('Submission response received:', submissionResponse);

        if (!submissionResponse.ok) {
            let errorData;
            try {
                errorData = await submissionResponse.json();
            } catch (e) {
                errorData = { message: 'Failed to parse error response.' };
            }
            console.error('Error Response:', errorData);
            alert(`Error: ${errorData.message || 'Failed to submit code.'}`);
            return;
        }

        const submissionData = await submissionResponse.json();
        console.log('Submission data:', submissionData);

        if (!submissionData.token) {
            console.error('No token received from the API.');
            alert('An error occurred while submitting the code.');
            return;
        }

        const { token } = submissionData;
        console.log('Token received:', token);

        const maxPollAttempts = 10; // Limit polling attempts
        let pollAttempts = 0;
        let result;

        do {
            if (pollAttempts >= maxPollAttempts) {
                alert('Maximum polling attempts reached. Please try again.');
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            pollAttempts++;

            console.log(`Polling attempt #${pollAttempts}...`);
            const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5a0dd51491msh905e8c2de4d0fadp1372d3jsnf039633a0314',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            });

            console.log('Polling response:', resultResponse);

            if (!resultResponse.ok) {
                console.error('Polling failed:', resultResponse.statusText);
                alert('Failed to retrieve execution results.');
                return;
            }

            result = await resultResponse.json();
            console.log('Polling result:', result);
        } while (result.status.id <= 2);

        displayDebugResult(result);

    } catch (error) {
        console.error('Debug Error:', error);
        alert('An unexpected error occurred during debugging.');
    }
});