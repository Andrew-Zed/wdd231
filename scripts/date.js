// Dynamic date functionality for footer
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    updateCopyrightYear();
    
    // Update last modified date
    updateLastModified();
});

// Update the current year in the footer
function updateCopyrightYear() {
    const currentYearElement = document.querySelector('#currentyear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// Update the last modified date in the footer
function updateLastModified() {
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        const lastModifiedDate = document.lastModified;
        lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate}`;
    }
}

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCopyrightYear,
        updateLastModified
    };
}