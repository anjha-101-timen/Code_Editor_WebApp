let base64Image = null;

    // Handle image upload
    promptImageBtn.addEventListener('click', function () {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    base64Image = e.target.result; // Store base64 image data
                    localStorage.setItem('promptImage', base64Image); // Save to localStorage
                    console.log("Image data stored in localStorage:", base64Image.substring(0, 50) + "...");
                    alert("Image uploaded successfully!");
                };
                reader.onerror = function (e) {
                    console.error("FileReader error:", e);
                    alert("Failed to upload the image.");
                };
                reader.readAsDataURL(file);
            }
        });

        fileInput.click();
    });