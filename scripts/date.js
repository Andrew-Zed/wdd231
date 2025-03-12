// JavaScript for date functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Display the current year in the footer
    document.getElementById('currentyear').textContent = currentYear;
    
    // Display the last modified date of the document
    document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;
});