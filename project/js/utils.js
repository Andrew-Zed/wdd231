// utils.js - Utility functions module

// Initialize lazy loading for images
function lazyLoadImages() {
    // Get all images with the lazy loading class
    const lazyImages = document.querySelectorAll('.img-lazy');
    
    // If IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If image is in viewport
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Set the real source from data-src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        
                        // Wait for the image to load
                        img.onload = () => {
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                        };
                    }
                    
                    // Stop observing the image
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Start observing each lazy image
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Load all images immediately
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                };
            }
        });
    }
}

// Debounce function to limit how often a function can be called
function debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Truncate text to a specific length and add ellipsis
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
}

// Generate random ID
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    
    for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
}

// Export functions
export { 
    lazyLoadImages, 
    debounce, 
    formatCurrency, 
    truncateText, 
    generateId 
};