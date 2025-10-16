// Artists page JavaScript
// Demonstrates: DOM manipulation, array methods, template literals, async/await, ES modules

import { fetchArtists } from './data.js';
import { storeVisitData, getVisitData } from './main.js';

let allArtists = [];
let currentCategory = 'all';

// Initialize artists page
document.addEventListener('DOMContentLoaded', async () => {
    await loadArtists();
    initializeFilters();
    initializeModal();
    trackArtistViews();
});

// Load artists data with try-catch for error handling
async function loadArtists() {
    try {
        allArtists = await fetchArtists();
        displayArtists(allArtists);
    } catch (error) {
        console.error('Failed to load artists:', error);
        displayError();
    }
}

// Display artists using template literals and DOM manipulation
function displayArtists(artists) {
    const grid = document.getElementById('artists-grid');
    
    if (artists.length === 0) {
        grid.innerHTML = '<p class="loading">No artists found in this category.</p>';
        return;
    }

    // Use map() array method to create HTML for each artist
    const artistCards = artists.map(artist => {
        const initials = artist.name.split(' ').map(n => n[0]).join('');
        
        // Template literal for artist card HTML
        return `
            <article class="artist-card" data-category="${artist.category}">
                <div class="artist-image">${initials}</div>
                <div class="artist-content">
                    <h3>${artist.name}</h3>
                    <span class="artist-category">${formatCategory(artist.category)}</span>
                    <p>${artist.bio}</p>
                    <div class="artist-details">
                        <strong>Specialty:</strong> ${artist.specialty}<br>
                        <strong>Location:</strong> ${artist.location}
                    </div>
                    <button class="view-details-btn" data-id="${artist.id}">View Details</button>
                </div>
            </article>
        `;
    }).join('');

    grid.innerHTML = artistCards;

    // Add event listeners to all "View Details" buttons
    const detailButtons = grid.querySelectorAll('.view-details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const artistId = parseInt(e.target.dataset.id);
            showArtistModal(artistId);
        });
    });
}

// Initialize category filter
function initializeFilters() {
    const filterSelect = document.getElementById('category-filter');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            filterArtists(currentCategory);
        });
    }
}

// Filter artists using filter() array method
function filterArtists(category) {
    if (category === 'all') {
        displayArtists(allArtists);
    } else {
        const filtered = allArtists.filter(artist => artist.category === category);
        displayArtists(filtered);
    }
}

// Initialize modal dialog
function initializeModal() {
    const modal = document.getElementById('artist-modal');
    const closeBtn = modal.querySelector('.modal-close');

    // Close modal when clicking X button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Show artist details in modal
function showArtistModal(artistId) {
    const artist = allArtists.find(a => a.id === artistId);
    
    if (!artist) return;

    const modal = document.getElementById('artist-modal');
    const modalBody = document.getElementById('modal-body');

    // Template literal for modal content
    modalBody.innerHTML = `
        <h3>${artist.name}</h3>
        <p class="modal-detail"><strong>Category:</strong> ${formatCategory(artist.category)}</p>
        <p class="modal-detail"><strong>Specialty:</strong> ${artist.specialty}</p>
        <p class="modal-detail"><strong>Location:</strong> ${artist.location}</p>
        <p class="modal-detail"><strong>Years Active:</strong> ${artist.yearsActive}</p>
        <p class="modal-detail"><strong>Notable Achievement:</strong> ${artist.notable}</p>
        <p>${artist.bio}</p>
    `;

    modal.classList.add('active');

    // Track modal views in memory storage
    const viewKey = `artist_view_${artistId}`;
    const views = parseInt(getVisitData(viewKey) || '0') + 1;
    storeVisitData(viewKey, views.toString());
}

// Format category names for display
function formatCategory(category) {
    const categories = {
        'visual-arts': 'Visual Arts',
        'music': 'Music',
        'literature': 'Literature',
        'film': 'Film'
    };
    return categories[category] || category;
}

// Track artist page views using in-memory storage
function trackArtistViews() {
    const pageViewKey = 'artists_page_views';
    const currentViews = parseInt(getVisitData(pageViewKey) || '0') + 1;
    storeVisitData(pageViewKey, currentViews.toString());
    console.log(`Artists page viewed ${currentViews} time(s)`);
}

// Display error message
function displayError() {
    const grid = document.getElementById('artists-grid');
    grid.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--accent-color);">
            <p>Unable to load artists at this time. Please try again later.</p>
        </div>
    `;
}