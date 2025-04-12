// JavaScript for the Thank You page

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Display form data from URL parameters
    document.getElementById('firstName').textContent = params.get('firstName') || 'N/A';
    document.getElementById('lastName').textContent = params.get('lastName') || 'N/A';
    document.getElementById('email').textContent = params.get('email') || 'N/A';
    document.getElementById('phone').textContent = params.get('phone') || 'N/A';
    document.getElementById('business').textContent = params.get('business') || 'N/A';
    
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
            document.getElementById('timestampDisplay').textContent = formattedDate;
        } catch (error) {
            document.getElementById('timestampDisplay').textContent = timestamp;
        }
    } else {
        document.getElementById('timestampDisplay').textContent = 'N/A';
    }
    
    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
    
    // Set last modified date in footer
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});

// Handle hamburger menu toggle
document.getElementById('hamburgerBtn').addEventListener('click', function() {
    document.getElementById('primaryNav').classList.toggle('open');
    this.classList.toggle('open');
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}