// join.js - JavaScript for the Chamber of Commerce join page

// Toggle the navigation menu for mobile view
document.getElementById('hamburgerBtn').addEventListener('click', function() {
    document.getElementById('primaryNav').classList.toggle('open');
});

// Update the footer with current year and last modified date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Add current timestamp to the hidden form field when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    
    // Format the date as YYYY-MM-DD HH:MM:SS
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    // Set the timestamp field value
    document.getElementById('timestamp').value = formattedDateTime;
});

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    
    // Add event listener to close when clicking outside the modal
    window.onclick = function(event) {
        if (event.target === document.getElementById(modalId)) {
            closeModal(modalId);
        }
    };
    
    // Add event listener to close when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form validation (in addition to HTML5 validation)
document.getElementById('membershipForm').addEventListener('submit', function(event) {
    let valid = true;
    
    // Additional validation for title field pattern if it has a value
    const titleField = document.getElementById('title');
    if (titleField.value !== '') {
        const titlePattern = /^[A-Za-z\s\-]{7,}$/;
        if (!titlePattern.test(titleField.value)) {
            valid = false;
            alert('Business position title must be at least 7 characters and contain only letters, spaces, and hyphens.');
        }
    }
    
    // Validate phone number format
    const phoneField = document.getElementById('phone');
    const phonePattern = /^[\d\s\(\)\-\.]+$/; // Basic pattern for numbers, spaces, parentheses, hyphens, and periods
    if (!phonePattern.test(phoneField.value)) {
        valid = false;
        alert('Please enter a valid phone number format.');
    }
    
    // If validation fails, prevent form submission
    if (!valid) {
        event.preventDefault();
    }
});