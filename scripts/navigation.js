// JavaScript for the responsive navigation menu

document.addEventListener('DOMContentLoaded', function() {
    // Get the menu button and navigation elements
    const menuButton = document.getElementById('menu-button');
    const mainNav = document.getElementById('main-nav');
    
    // Toggle the navigation menu when the button is clicked
    menuButton.addEventListener('click', function() {
        mainNav.classList.toggle('open');
        
        // Change the button icon based on menu state
        // If menu is open, show X, otherwise show hamburger
        this.innerHTML = mainNav.classList.contains('open') ? '&#10005;' : '&#9776;';
        
        // Update aria-expanded attribute for accessibility
        this.setAttribute('aria-expanded', mainNav.classList.contains('open'));
    });
    
    // Close the menu if window is resized to larger breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mainNav.classList.remove('open');
            menuButton.innerHTML = '&#9776;';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Add active class to current page link for wayfinding
    const links = document.querySelectorAll('#main-nav a');
    const currentPage = window.location.pathname.split('/').pop();
    
    links.forEach(link => {
        // Check if this link matches the current page
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
});