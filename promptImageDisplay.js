promptImageDisplayBtn.addEventListener('click', function () {
    const storedImage = localStorage.getItem('promptImage');
    if (storedImage) {
        const img = new Image();
        img.src = storedImage;
        img.onload = function () {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            modal.style.opacity = '0'; // Initial opacity
            modal.style.transition = 'opacity 0.3s ease, background-color 0.3s ease'; // Smooth transitions

            const imgContainer = document.createElement('div');
            imgContainer.style.maxWidth = '80%';
            imgContainer.style.maxHeight = '80%';
            imgContainer.style.opacity = '0'; // Initial image opacity
            imgContainer.style.transition = 'opacity 0.3s ease'; // Smooth image transition
            imgContainer.appendChild(img);

            modal.appendChild(imgContainer);
            document.body.appendChild(modal);

            // Trigger opening animation
            setTimeout(() => {
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.opacity = '1';
                imgContainer.style.opacity = '1';
            }, 10);

            // Close modal on outside click
            modal.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.opacity = '0';
                    imgContainer.style.opacity = '0';

                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        };
        img.onerror = function () {
            alert("Failed to load the stored image.");
        };
    } else {
        alert("No image stored in local storage.");
    }
});