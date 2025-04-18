// display.js - Module for displaying data in the DOM

import { openModal } from './modal.js';

// Display items in the specified container
function displayItems(data, container) {
    // Clear any loading message or existing content
    container.innerHTML = '';
    
    // Check if we have data
    if (!data || !Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p class="no-items">No items found.</p>';
        return;
    }
    
    // Create HTML for each item
    data.forEach(item => {
        const itemElement = createItemElement(item);
        container.appendChild(itemElement);
    });
}

// Create HTML element for a single item
function createItemElement(item) {
    // Create container div
    const itemDiv = document.createElement('div');
    itemDiv.className = 'featured-item';
    itemDiv.dataset.id = item.id;
    
    // Create image with lazy loading
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    
    const img = document.createElement('img');
    img.className = 'img-lazy';
    img.dataset.src = item.image; // Data attribute for lazy loading
    img.alt = item.name;
    
    // Placeholder while the image loads
    img.src = 'images/placeholder.png';
    
    imgContainer.appendChild(img);
    
    // Create content div
    const contentDiv = document.createElement('div');
    contentDiv.className = 'featured-item-content';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = item.name;
    
    // Create description
    const description = document.createElement('p');
    description.textContent = item.description;
    
    // Create metadata div
    const metaDiv = document.createElement('div');
    metaDiv.className = 'item-meta';
    
    // Add category
    const category = document.createElement('span');
    category.className = 'item-category';
    category.textContent = `Category: ${item.category}`;
    
    // Add rating
    const rating = document.createElement('span');
    rating.className = 'item-rating';
    rating.textContent = `Rating: ${item.rating}`;
    
    // Add date
    const date = document.createElement('span');
    date.className = 'item-date';
    date.textContent = `Date: ${formatDate(item.date)}`;
    
    // Assemble metadata
    metaDiv.appendChild(category);
    metaDiv.appendChild(document.createElement('br'));
    metaDiv.appendChild(rating);
    metaDiv.appendChild(document.createElement('br'));
    metaDiv.appendChild(date);
    
    // Add details button
    const detailsButton = document.createElement('button');
    detailsButton.className = 'details-button';
    detailsButton.textContent = 'View Details';
    
    // Add click event to show modal with item details
    detailsButton.addEventListener('click', () => {
        showItemDetails(item);
    });
    
    // Assemble content div
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(metaDiv);
    contentDiv.appendChild(detailsButton);
    
    // Assemble item div
    itemDiv.appendChild(imgContainer);
    itemDiv.appendChild(contentDiv);
    
    return itemDiv;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Show item details in modal
function showItemDetails(item) {
    // Create content for the modal
    const modalContent = document.createElement('div');
    modalContent.className = 'item-details';
    
    // Create item header
    const header = document.createElement('h2');
    header.textContent = item.name;
    modalContent.appendChild(header);
    
    // Create image
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.className = 'item-details-image';
    modalContent.appendChild(img);
    
    // Create description
    const description = document.createElement('p');
    description.textContent = item.description;
    description.className = 'item-details-description';
    modalContent.appendChild(description);
    
    // Create metadata table
    const metaTable = document.createElement('table');
    metaTable.className = 'item-details-table';
    
    // Add rows to table using template literals
    metaTable.innerHTML = `
        <tr>
            <th>Category:</th>
            <td>${item.category}</td>
        </tr>
        <tr>
            <th>Rating:</th>
            <td>${item.rating}</td>
        </tr>
        <tr>
            <th>Date:</th>
            <td>${formatDate(item.date)}</td>
        </tr>
        ${item.price ? `
        <tr>
            <th>Price:</th>
            <td>$${item.price.toFixed(2)}</td>
        </tr>
        ` : ''}
        ${item.tags ? `
        <tr>
            <th>Tags:</th>
            <td>${item.tags.join(', ')}</td>
        </tr>
        ` : ''}
    `;
    
    modalContent.appendChild(metaTable);
    
    // If item has additional details, add them
    if (item.details) {
        const detailsTitle = document.createElement('h3');
        detailsTitle.textContent = 'Additional Details';
        modalContent.appendChild(detailsTitle);
        
        const detailsList = document.createElement('ul');
        detailsList.className = 'item-details-list';
        
        item.details.forEach(detail => {
            const listItem = document.createElement('li');
            listItem.textContent = detail;
            detailsList.appendChild(listItem);
        });
        
        modalContent.appendChild(detailsList);
    }
    
    // Open the modal with the content
    openModal(modalContent);
}

// Export functions to be used in other modules
export { displayItems, createItemElement, showItemDetails };