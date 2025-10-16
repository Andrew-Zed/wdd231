// discover.js - Handles discover page functionality

// Function to display visit message
function displayVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    
    if (!lastVisit) {
        // First visit
        messageContainer.innerHTML = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDiff = currentDate - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            // Less than a day
            messageContainer.innerHTML = '<p>Back so soon! Awesome!</p>';
        } else if (daysDiff === 1) {
            // Exactly 1 day
            messageContainer.innerHTML = '<p>You last visited 1 day ago.</p>';
        } else {
            // More than 1 day
            messageContainer.innerHTML = `<p>You last visited ${daysDiff} days ago.</p>`;
        }
    }
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentDate.toString());
}

// Function to load and display attractions
async function loadAttractions() {
    try {
        const response = await fetch('data/discover-data.json');
        const data = await response.json();
        
        const discoverSection = document.getElementById('discover-section');
        
        data.attractions.forEach((attraction) => {
            const card = document.createElement('article');
            card.className = 'discover-card';
            card.setAttribute('data-area', `area-${attraction.id}`);
            
            card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" 
                         alt="${attraction.name}" 
                         loading="lazy"
                         width="300" 
                         height="200">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button class="learn-more-btn" aria-label="Learn more about ${attraction.name}">Learn More</button>
            `;
            
            discoverSection.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading attractions:', error);
        document.getElementById('discover-section').innerHTML = 
            '<p>Sorry, we could not load the attractions at this time. Please try again later.</p>';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    loadAttractions();
});