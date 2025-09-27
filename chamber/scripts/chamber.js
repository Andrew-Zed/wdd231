// Main JavaScript for Chamber of Commerce website
// Handles common functionality across all pages

document.addEventListener('DOMContentLoaded', function () {
    // Set up UI elements and event listeners
    setupUIElements();

    // Apply saved preferences (like dark mode)
    applyUserPreferences();

    // Set common page elements
    updateFooterInfo();

    // Page-specific functionality
    initializeCurrentPage();
});

// Setup UI elements and event handlers
function setupUIElements() {
    // Hamburger menu toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');

    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', function () {
            primaryNav.classList.toggle('open');
            hamburgerBtn.textContent = primaryNav.classList.contains('open') ? '❌' : '☰';
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.textContent = isDark ? '☀️' : '🌓';

            // Save preference to localStorage
            localStorage.setItem('darkMode', isDark);
        });
    }

    // Setup modals for membership page
    setupModals();
}

// Apply user preferences from storage
function applyUserPreferences() {
    // Apply dark mode if saved
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️';
        }
    }
}

// Update footer information
function updateFooterInfo() {
    // Set current year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// Setup modal functionality
function setupModals() {
    // Register modal functions in window scope
    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
        }
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    });
}

// Initialize functionality for the current page
function initializeCurrentPage() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();

    // Join page initialization
    if (pageName === 'join.html' || pageName === '') {
        initJoinPage();
    }

    // Thank you page initialization
    if (pageName === 'thankyou.html') {
        initThankYouPage();
    }
}

// Initialize Join page functionality
function initJoinPage() {
    // Set timestamp in hidden field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
}

// Initialize Thank You page functionality
function initThankYouPage() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    // Display form data from URL parameters
    displayParameter('firstName', params);
    displayParameter('lastName', params);
    displayParameter('email', params);
    displayParameter('phone', params);
    displayParameter('business', params);

    // Format and display timestamp
    const timestamp = params.get('timestamp');
    if (timestamp) {
        try {
            const date = new Date(timestamp);
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
            const timestampDisplay = document.getElementById('timestampDisplay');
            if (timestampDisplay) {
                timestampDisplay.textContent = formattedDate;
            }
        } catch (error) {
            console.error('Error formatting date:', error);
            const timestampDisplay = document.getElementById('timestampDisplay');
            if (timestampDisplay) {
                timestampDisplay.textContent = timestamp;
            }
        }
    }
}

// Helper function to display parameters on thank you page
function displayParameter(paramName, params) {
    const element = document.getElementById(paramName);
    if (element) {
        element.textContent = params.get(paramName) || 'N/A';
    }
}