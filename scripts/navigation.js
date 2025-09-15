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
    
    // Set initial accessibility state based on screen size
    setInitialAccessibilityState(navButton, navLinks);
    
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
        // Update accessibility state on resize
        setInitialAccessibilityState(navButton, navLinks);
        
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

// Set initial accessibility state based on screen size
function setInitialAccessibilityState(navButton, navLinks) {
    if (window.innerWidth >= 608) {
        // Desktop: navigation is always visible
        navLinks.removeAttribute('aria-hidden');
        navButton.setAttribute('aria-expanded', 'false');
        // Make sure links are focusable on desktop
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.removeAttribute('tabindex');
        });
    } else {
        // Mobile: navigation is hidden by default
        navLinks.setAttribute('aria-hidden', 'true');
        navButton.setAttribute('aria-expanded', 'false');
        // Make links non-focusable when hidden
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('tabindex', '-1');
        });
    }
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
    
    // Make links focusable when navigation is open
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.removeAttribute('tabindex');
    });
    
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
    
    // Only set aria-hidden on mobile
    if (window.innerWidth < 608) {
        navLinks.setAttribute('aria-hidden', 'true');
        // Make links non-focusable when hidden
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('tabindex', '-1');
        });
    }
}

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        toggleNavigation,
        openNavigation,
        closeNavigation,
        setInitialAccessibilityState
    };
}