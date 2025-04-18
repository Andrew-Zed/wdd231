// navigation.js - Module for handling site navigation

// Initialize the navigation functionality
function initializeNavigation() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');
    
    if (!hamburgerBtn || !primaryNav) {
        console.error('Navigation elements not found in the DOM');
        return;
    }
    
    // Toggle menu when hamburger button is clicked
    hamburgerBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        
        // Change hamburger to X when open
        const isOpen = primaryNav.classList.contains('open');
        hamburgerBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
        
        // Set aria attributes for accessibility
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (primaryNav.classList.contains('open') && 
            event.target !== hamburgerBtn && 
            !primaryNav.contains(event.target)) {
            
            primaryNav.classList.remove('open');
            hamburgerBtn.innerHTML = '&#9776;';
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when window is resized to larger screen
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 560 && primaryNav.classList.contains('open')) {
            primaryNav.classList.remove('open');
            hamburgerBtn.innerHTML = '&#9776;';
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Set active link based on current page
    setActiveLink();
}

// Set the active link in navigation
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#primaryNav li');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active class for current page
    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Export functions
export { initializeNavigation, setActiveLink };