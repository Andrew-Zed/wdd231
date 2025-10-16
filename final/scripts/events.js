// Events page JavaScript
// Demonstrates: Array methods (map, forEach), template literals, DOM manipulation

import { generateEvents } from './data.js';
import { storeVisitData, getVisitData } from './main.js';

let allEvents = [];

// Initialize events page
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    trackEventPageView();
});

// Load and display events
function loadEvents() {
    try {
        allEvents = generateEvents();
        displayEvents(allEvents);
        updateEventCount(allEvents.length);
    } catch (error) {
        console.error('Error loading events:', error);
        displayError();
    }
}

// Display events using template literals and array methods
function displayEvents(events) {
    const container = document.getElementById('events-container');
    
    if (events.length === 0) {
        container.innerHTML = '<p class="loading">No events available at this time.</p>';
        return;
    }

    // Use map() to transform events data into HTML
    const eventCards = events.map(event => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString('en-US', { month: 'short' });
        const year = eventDate.getFullYear();

        // Template literal for event card HTML
        return `
            <article class="event-card">
                <div class="event-date-badge">
                    <span class="day">${day}</span>
                    <span class="month-year">${month} ${year}</span>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <span class="event-type">${formatEventType(event.type)}</span>
                    <p>${event.description}</p>
                    <div class="event-info">
                        <div class="event-info-item">
                            <strong>Time:</strong>
                            <span>${formatTime(event.time)}</span>
                        </div>
                        <div class="event-info-item">
                            <strong>Location:</strong>
                            <span>${event.location}</span>
                        </div>
                        <div class="event-info-item">
                            <strong>Venue:</strong>
                            <span>${event.venue}</span>
                        </div>
                        <div class="event-info-item">
                            <strong>Price:</strong>
                            <span>${event.price}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    container.innerHTML = eventCards;

    // Add click tracking to each event card
    const eventElements = container.querySelectorAll('.event-card');
    eventElements.forEach((card, index) => {
        card.addEventListener('click', () => {
            trackEventClick(events[index].id);
        });
    });
}

// Update event count display
function updateEventCount(count) {
    const countElement = document.getElementById('event-count');
    if (countElement) {
        countElement.textContent = `Showing ${count} upcoming event${count !== 1 ? 's' : ''}`;
    }
}

// Format event type for display
function formatEventType(type) {
    return type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Format time for display
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Track event clicks using in-memory storage
function trackEventClick(eventId) {
    const clickKey = `event_click_${eventId}`;
    const clicks = parseInt(getVisitData(clickKey) || '0') + 1;
    storeVisitData(clickKey, clicks.toString());
    console.log(`Event ${eventId} clicked ${clicks} time(s)`);
}

// Track events page views
function trackEventPageView() {
    const pageViewKey = 'events_page_views';
    const currentViews = parseInt(getVisitData(pageViewKey) || '0') + 1;
    storeVisitData(pageViewKey, currentViews.toString());
    console.log(`Events page viewed ${currentViews} time(s)`);
}

// Display error message
function displayError() {
    const container = document.getElementById('events-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--accent-color);">
            <p>Unable to load events at this time. Please try again later.</p>
        </div>
    `;
}