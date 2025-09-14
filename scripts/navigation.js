
// Responsive Navigation System
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// Initialize the navigation system
function initializeNavigation() {
    const navButton = document.querySelector('#ham-btn');
    const navLinks = document.querySelector('#nav-bar');
    
    // Check if elements exist
    if (!navButton || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }
    
    // Set up click event listener
    navButton.addEventListener('click', function() {
        toggleNavigation(navButton, navLinks);
    });
    
    // Handle keyboard navigation
    navButton.addEventListener('keydown', function(event) {
        // Toggle on Enter or Space
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleNavigation(navButton, navLinks);
        }
    });
    
    // Close navigation when clicking outside (mobile only)
    document.addEventListener('click', function(event) {
        const isNavigationVisible = navLinks.classList.contains('show');
        const isClickInsideNav = navLinks.contains(event.target) || navButton.contains(event.target);
        
        if (isNavigationVisible && !isClickInsideNav && window.innerWidth < 608) {
            closeNavigation(navButton, navLinks);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile navigation if window becomes large
        if (window.innerWidth >= 608) {
            closeNavigation(navButton, navLinks);
        }
    });
    
    // Handle escape key to close navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('show')) {
            closeNavigation(navButton, navLinks);
            navButton.focus(); // Return focus to hamburger button
        }
    });
}


// Toggle navigation menu
function toggleNavigation(navButton, navLinks) {
    const isOpen = navLinks.classList.contains('show');
    
    if (isOpen) {
        closeNavigation(navButton, navLinks);
    } else {
        openNavigation(navButton, navLinks);
    }
}

// Open navigation menu
function openNavigation(navButton, navLinks) {
    navButton.classList.add('show');
    navLinks.classList.add('show');
    
    // Update ARIA attributes for accessibility
    navButton.setAttribute('aria-expanded', 'true');
    navLinks.setAttribute('aria-hidden', 'false');
    
    // Focus first navigation link
    const firstLink = navLinks.querySelector('a');
    if (firstLink) {
        firstLink.focus();
    }
}


// Close navigation menu
function closeNavigation(navButton, navLinks) {
    navButton.classList.remove('show');
    navLinks.classList.remove('show');
    
    // Update ARIA attributes for accessibility
    navButton.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        toggleNavigation,
        openNavigation,
        closeNavigation
    };
}

