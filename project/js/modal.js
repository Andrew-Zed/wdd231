// modal.js - Module for handling modal dialogs

// Set up the modal functionality
function setupModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.querySelector('.close-button');
    
    if (!modal || !modalContent || !closeButton) {
        console.error('Modal elements not found in the DOM');
        return;
    }
    
    // Close button event
    closeButton.addEventListener('click', () => {
        closeModal();
    });
    
    // Close when clicking outside the modal content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Open the modal with the specified content
function openModal(content) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) {
        console.error('Modal elements not found in the DOM');
        return;
    }
    
    // Clear existing content
    modalContent.innerHTML = '';
    
    // If content is a DOM element, append it
    if (content instanceof Element) {
        modalContent.appendChild(content);
    } else {
        // Otherwise, set as innerHTML (assuming it's a string)
        modalContent.innerHTML = content;
    }
    
    // Display the modal
    modal.style.display = 'block';
    
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    // Store the last active element to restore focus later
    modal.lastActiveElement = document.activeElement;
    
    // Focus the close button for accessibility
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        setTimeout(() => {
            closeButton.focus();
        }, 100);
    }
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    
    if (!modal) {
        return;
    }
    
    // Hide the modal
    modal.style.display = 'none';
    
    // Restore scrolling on the body
    document.body.style.overflow = '';
    
    // Restore focus to the element that was active before opening the modal
    if (modal.lastActiveElement) {
        modal.lastActiveElement.focus();
    }
}

// Export functions to be used in other modules
export { setupModal, openModal, closeModal };