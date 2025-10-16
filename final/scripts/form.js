// Form action page JavaScript
// Displays form data from URL Search Params

document.addEventListener('DOMContentLoaded', () => {
    displayFormData();
});

// Display form data using URLSearchParams
function displayFormData() {
    const dataContainer = document.querySelector('.data-grid');
    
    if (!dataContainer) return;

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if we have form data
    if (!urlParams.has('name')) {
        dataContainer.innerHTML = '<p>No form data received.</p>';
        return;
    }

    // Extract form values
    const formData = {
        'Full Name': urlParams.get('name'),
        'Email Address': urlParams.get('email'),
        'Area of Interest': formatInterest(urlParams.get('interest'))
    };

    // Create HTML using template literals
    const dataItems = Object.entries(formData).map(([label, value]) => `
        <div class="data-item">
            <span class="data-label">${label}:</span>
            <span class="data-value">${value || 'Not provided'}</span>
        </div>
    `).join('');

    dataContainer.innerHTML = dataItems;

    // Add submission timestamp
    const timestamp = new Date().toLocaleString();
    dataContainer.innerHTML += `
        <div class="data-item">
            <span class="data-label">Submitted:</span>
            <span class="data-value">${timestamp}</span>
        </div>
    `;
}

// Format interest value for display
function formatInterest(interest) {
    if (!interest) return 'Not specified';
    
    const interests = {
        'visual-arts': 'Visual Arts',
        'music': 'Music',
        'literature': 'Literature',
        'film': 'Film',
        'all': 'All Categories'
    };
    
    return interests[interest] || interest;
}