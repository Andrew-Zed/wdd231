// Business Spotlights Integration
document.addEventListener('DOMContentLoaded', () => {
    async function fetchBusinessData() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) throw new Error('Business data not available');
            const data = await response.json();
            displayBusinessSpotlights(data);
        } catch (error) {
            console.error('Error fetching business data:', error);
            displaySpotlightError();
        }
    }

    function displayBusinessSpotlights(businesses) {
        const eligibleBusinesses = businesses.filter(b => b.membershipLevel >= 2);
        const spotlightBusinesses = getRandomBusinesses(eligibleBusinesses, getSpotlightCount());
        const spotlightsContainer = document.getElementById('spotlights-container');

        spotlightBusinesses.forEach(business => {
            const spotlightCard = document.createElement('div');
            spotlightCard.className = 'spotlight-card';

            const logoDiv = document.createElement('div');
            logoDiv.className = 'spotlight-logo';

            const logoImg = document.createElement('img');
            logoImg.src = `images/members/${business.image}`;
            logoImg.alt = `${business.name} logo`;
            logoImg.loading = 'lazy'; // ✅ ADDED lazy loading
            logoImg.onerror = () => logoImg.src = 'images/placeholder-logo.png'; // ✅ ADDED fallback image

            logoDiv.appendChild(logoImg);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'spotlight-info';

            infoDiv.innerHTML = `
                <h3>${business.name}</h3>
                <p class="tagline">${business.additionalInfo || ''}</p>
                <p>${business.address || ''}</p>
                <p>${business.phone || ''}</p>
                <p><a href="${business.website || '#'}" target="_blank">${business.website ? 'Visit Website' : ''}</a></p>
                <span class="membership-badge ${business.membershipLevel === 3 ? 'gold' : 'silver'}">
                    ${business.membershipLevel === 3 ? 'GOLD' : 'SILVER'}
                </span>
            `;

            spotlightCard.appendChild(logoDiv);
            spotlightCard.appendChild(infoDiv);
            spotlightsContainer.appendChild(spotlightCard);
        });
    }

    function getRandomBusinesses(arr, count) {
        return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
    }

    function getSpotlightCount() {
        return window.innerWidth >= 1024 ? 3 : 2;
    }

    function displaySpotlightError() {
        document.getElementById('spotlights-container').innerHTML = `
            <p class="error-message">
                Business spotlight data is currently unavailable. Please check back later.
            </p>`;
    }

    fetchBusinessData();
});