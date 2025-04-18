// main.js - Main JavaScript entry point
import { fetchData } from './data.js';
import { displayItems } from './display.js';
import { setupModal } from './modal.js';
import { initializeNavigation } from './navigation.js';
import { lazyLoadImages } from './utils.js';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize navigation
    initializeNavigation();
    
    // Set up footer dynamic info
    updateFooterInfo();
    
    // Set up modal
    setupModal();
    
    // Fetch and display data
    try {
        const data = await fetchData();
        const featuredItemsContainer = document.getElementById('featuredItems');
        
        // Display featured items if the container exists
        if (featuredItemsContainer) {
            displayItems(data, featuredItemsContainer);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        
        // Show error message if the featured items container exists
        const featuredItemsContainer = document.getElementById('featuredItems');
        if (featuredItemsContainer) {
            featuredItemsContainer.innerHTML = `
                <div class="error-message">
                    <p>Sorry, we couldn't load the content. Please try again later.</p>
                </div>
            `;
        }
    }
    
    // Initialize lazy loading for images
    lazyLoadImages();
});

// Update footer information
function updateFooterInfo() {
    // Set current year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

// Export any functions that need to be accessed from other scripts
export { updateFooterInfo };