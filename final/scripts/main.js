// Main JavaScript for Nigerian Arts & Culture Portal
// DOM Manipulation and Navigation

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    updateLastVisit();
});

// Initialize responsive navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            }
        });

        // Close menu when window is resized to larger screen
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }
}

// Update last visit timestamp using in-memory storage
function updateLastVisit() {
    const lastVisitKey = 'nacp_last_visit';
    const lastVisit = getVisitData(lastVisitKey);
    const currentVisit = new Date().toLocaleString();

    if (lastVisit) {
        console.log(`Welcome back! Last visit: ${lastVisit}`);
    } else {
        console.log('Welcome to Nigerian Arts & Culture Portal!');
    }

    // Store current visit
    storeVisitData(lastVisitKey, currentVisit);
}

// In-memory storage simulation (since localStorage is not available)
const memoryStorage = {};

function storeVisitData(key, value) {
    memoryStorage[key] = value;
}

function getVisitData(key) {
    return memoryStorage[key] || null;
}

// Export functions for use in other modules
export { storeVisitData, getVisitData, memoryStorage };