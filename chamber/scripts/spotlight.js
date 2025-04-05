// Business Spotlights Integration
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data of chamber members
    async function fetchBusinessData() {
        try {
            const response = await fetch('data/members.json');
            
            if (!response.ok) {
                throw new Error('Business data not available');
            }
            
            const data = await response.json();
            displayBusinessSpotlights(data);
        } catch (error) {
            console.error('Error fetching business data:', error);
            displaySpotlightError();
        }
    }
    
    // Function to display business spotlights
    function displayBusinessSpotlights(businesses) {
        // Filter businesses to only include gold and silver members (levels 3 and 2)
        const eligibleBusinesses = businesses.filter(business => 
            business.membershipLevel === 3 || business.membershipLevel === 2
        );
        
        // Randomly select 2-3 businesses for spotlights
        const spotlightBusinesses = getRandomBusinesses(eligibleBusinesses, getSpotlightCount());
        
        // Display the selected businesses
        const spotlightsContainer = document.getElementById('spotlights-container');
        
        spotlightBusinesses.forEach(business => {
            const spotlightCard = document.createElement('div');
            spotlightCard.className = 'spotlight-card';
            
            const logoDiv = document.createElement('div');
            logoDiv.className = 'spotlight-logo';
            
            const logoImg = document.createElement('img');
            logoImg.src = `images/members/${business.image}` || 'images/placeholder-logo.png';
            logoImg.alt = `${business.name} logo`;
            
            logoDiv.appendChild(logoImg);
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'spotlight-info';
            
            const nameHeading = document.createElement('h3');
            nameHeading.textContent = business.name;
            
            const tagline = document.createElement('p');
            tagline.className = 'tagline';
            tagline.textContent = business.additionalInfo || '';
            
            const address = document.createElement('p');
            address.textContent = business.address || '';
            
            const phone = document.createElement('p');
            phone.textContent = business.phone || '';
            
            const website = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = business.website || '#';
            websiteLink.textContent = business.website ? 'Visit Website' : '';
            websiteLink.target = '_blank';
            website.appendChild(websiteLink);
            
            const membershipBadge = document.createElement('span');
            membershipBadge.className = `membership-badge ${business.membershipLevel === 3 ? 'gold' : 'silver'}`;
            membershipBadge.textContent = business.membershipLevel === 3 ? 'GOLD' : 'SILVER';
            
            infoDiv.appendChild(nameHeading);
            infoDiv.appendChild(tagline);
            infoDiv.appendChild(address);
            infoDiv.appendChild(phone);
            infoDiv.appendChild(website);
            infoDiv.appendChild(membershipBadge);
            
            spotlightCard.appendChild(logoDiv);
            spotlightCard.appendChild(infoDiv);
            
            spotlightsContainer.appendChild(spotlightCard);
        });
    }
    
    // Helper function to get random businesses from the array
    function getRandomBusinesses(businesses, count) {
        // Shuffle the array
        const shuffled = [...businesses].sort(() => 0.5 - Math.random());
        // Get the first 'count' elements
        return shuffled.slice(0, count);
    }
    
    // Helper function to determine how many spotlights to show based on screen size
    function getSpotlightCount() {
        // For mobile, show 2 spotlights; for desktop, show 3
        return window.innerWidth >= 1024 ? 3 : 2;
    }
    
    // Error handling function
    function displaySpotlightError() {
        const spotlightsContainer = document.getElementById('spotlights-container');
        spotlightsContainer.innerHTML = `
            <p class="error-message">
                Business spotlight data is currently unavailable. Please check back later.
            </p>
        `;
    }
    
    // Initial fetch
    fetchBusinessData();
});