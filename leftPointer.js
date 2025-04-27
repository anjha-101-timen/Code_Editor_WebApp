document.addEventListener('DOMContentLoaded', function() {
    const additionalInput = document.querySelector('.additional-input');
    const leftPointerBtn = document.getElementById('leftPointerBtn');

    if (additionalInput && leftPointerBtn) {
        leftPointerBtn.addEventListener('click', function() {
            // Add blur effect
            additionalInput.style.transition = 'filter 0.3s ease'; // Smooth transition
            additionalInput.style.filter = 'blur(5px)';

            // Clear the text content after a short delay
            setTimeout(function() {
                additionalInput.value = '';
                additionalInput.style.height = 'auto';
                additionalInput.style.transition = 'filter 0.3s ease';// smooth transition back.
                additionalInput.style.filter = 'blur(0px)'; // Remove blur
            }, 500); // Delay of 500ms (increased delay)
        });
    }
});