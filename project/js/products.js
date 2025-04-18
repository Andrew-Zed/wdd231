// products.js - JavaScript for the products page
import { fetchData, filterData, sortData, searchData } from './data.js';
import { displayItems, showItemDetails } from './display.js';
import { openModal } from './modal.js';
import { lazyLoadImages } from './utils.js';

// DOM elements
let productsGrid;
let filterButtons;
let searchInput;
let sortSelect;
let prevPageBtn;
let nextPageBtn;
let pageIndicator;
let newsletterForm;
let newsletterMessage;

// Pagination state
let currentPage = 1;
let itemsPerPage = 6;
let filteredProducts = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    // Get DOM elements
    productsGrid = document.getElementById('productsGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    searchInput = document.getElementById('searchInput');
    sortSelect = document.getElementById('sortSelect');
    prevPageBtn = document.getElementById('prevPage');
    nextPageBtn = document.getElementById('nextPage');
    pageIndicator = document.getElementById('pageIndicator');
    newsletterForm = document.getElementById('newsletterForm');
    newsletterMessage = document.getElementById('newsletterMessage');
    
    // Set up event listeners
    setupEventListeners();
    
    // Load and display products
    await loadProducts();
    
    // Initialize lazy loading for images
    lazyLoadImages();
    
    // Set up spotlight product details button
    const spotlightBtn = document.querySelector('.view-details-btn');
    if (spotlightBtn) {
        spotlightBtn.addEventListener('click', showSpotlightDetails);
    }
});

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterChange);
    });
    
    // Search input with debounce
    searchInput.addEventListener('input', debounceSearch);
    
    // Sort select
    sortSelect.addEventListener('change', handleSortChange);
    
    // Pagination buttons
    prevPageBtn.addEventListener('click', () => changePage(-1));
    nextPageBtn.addEventListener('click', () => changePage(1));
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Debounce search input to avoid too many updates
const debounceSearch = debounce(() => {
    handleSearchInput();
}, 300);

function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle filter button clicks
function handleFilterChange(event) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Get selected category
    const category = event.target.getAttribute('data-category');
    
    // Reset page to 1 when filter changes
    currentPage = 1;
    
    // Apply filters and update display
    applyFiltersAndUpdate();
}

// Handle search input
function handleSearchInput() {
    // Reset page to 1 when search changes
    currentPage = 1;
    
    // Apply filters and update display
    applyFiltersAndUpdate();
}

// Handle sort selection change
function handleSortChange() {
    // Apply filters and update display
    applyFiltersAndUpdate();
}

// Apply all filters and update the display
async function applyFiltersAndUpdate() {
    const allProducts = await getAllProducts();
    
    // Get filter values
    const selectedCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
    const searchTerm = searchInput.value.trim();
    const sortOption = sortSelect.value;
    
    // Apply category filter
    let filtered = allProducts;
    if (selectedCategory !== 'all') {
        filtered = filterData(filtered, { category: selectedCategory });
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = searchData(filtered, searchTerm);
    }
    
    // Apply sorting
    const [sortBy, sortOrder] = sortOption.split('-');
    filtered = sortData(filtered, sortBy, sortOrder);
    
    // Update filtered products
    filteredProducts = filtered;
    
    // Update the display
    updateProductsDisplay();
}

// Change page
function changePage(direction) {
    currentPage += direction;
    updateProductsDisplay();
}

// Update the products display with pagination
function updateProductsDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    // Update page indicator
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    
    // Enable/disable pagination buttons
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages || totalPages === 0;
    
    // Clear the grid
    productsGrid.innerHTML = '';
    
    // Show message if no products found
    if (currentItems.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
        return;
    }
    
    // Display products
    currentItems.forEach(product => {
        const productElement = createProductElement(product);
        productsGrid.appendChild(productElement);
    });
    
    // Initialize lazy loading for new images
    lazyLoadImages();
}

// Create a product element
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    productElement.dataset.id = product.id;
    
    // Create product image container with lazy loading
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';
    
    const image = document.createElement('img');
    image.className = 'img-lazy';
    image.dataset.src = product.image;
    image.src = 'images/placeholder.png';
    image.alt = product.name;
    
    imageContainer.appendChild(image);
    
    // Create product content
    const content = document.createElement('div');
    content.className = 'product-content';
    
    // Product title
    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.name;
    
    // Product category
    const category = document.createElement('p');
    category.className = 'product-category';
    category.textContent = product.category;
    
    // Product description (truncated)
    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = truncateText(product.description, 100);
    
    // Product price and rating
    const meta = document.createElement('div');
    meta.className = 'product-meta';
    
    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    const rating = document.createElement('span');
    rating.className = 'product-rating';
    rating.innerHTML = getStarRating(product.rating);
    
    meta.appendChild(price);
    meta.appendChild(rating);
    
    // View details button
    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'product-details-btn';
    detailsBtn.textContent = 'View Details';
    detailsBtn.addEventListener('click', () => {
        showProductDetails(product);
    });
    
    // Assemble the product card
    content.appendChild(title);
    content.appendChild(category);
    content.appendChild(description);
    content.appendChild(meta);
    content.appendChild(detailsBtn);
    
    productElement.appendChild(imageContainer);
    productElement.appendChild(content);
    
    return productElement;
}

// Show product details in modal
function showProductDetails(product) {
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'product-details';
    
    // Product title
    const title = document.createElement('h2');
    title.textContent = product.name;
    
    // Product image
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    image.className = 'product-details-image';
    
    // Product description
    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;
    
    // Product meta information
    const metaInfo = document.createElement('div');
    metaInfo.className = 'product-details-meta';
    
    // Create table for product info
    const table = document.createElement('table');
    
    // Add rows using template literals
    table.innerHTML = `
        <tr>
            <th>Category:</th>
            <td>${product.category}</td>
        </tr>
        <tr>
            <th>Price:</th>
            <td>$${product.price.toFixed(2)}</td>
        </tr>
        <tr>
            <th>Rating:</th>
            <td>${getStarRating(product.rating)} (${product.rating})</td>
        </tr>
        <tr>
            <th>Date Added:</th>
            <td>${formatDate(product.date)}</td>
        </tr>
    `;
    
    metaInfo.appendChild(table);
    
    // Product features if available
    if (product.details && product.details.length > 0) {
        const features = document.createElement('div');
        features.className = 'product-features';
        
        const featuresTitle = document.createElement('h3');
        featuresTitle.textContent = 'Features';
        features.appendChild(featuresTitle);
        
        const featuresList = document.createElement('ul');
        product.details.forEach(detail => {
            const item = document.createElement('li');
            item.textContent = detail;
            featuresList.appendChild(item);
        });
        
        features.appendChild(featuresList);
        metaInfo.appendChild(features);
    }
    
    // Assemble modal content
    modalContent.appendChild(title);
    modalContent.appendChild(image);
    modalContent.appendChild(description);
    modalContent.appendChild(metaInfo);
    
    // Open modal with content
    openModal(modalContent);
}

// Show spotlight product details
function showSpotlightDetails() {
    // Get spotlight product data
    const spotlightProduct = {
        id: 'spotlight',
        name: 'Premium Product',
        description: 'This premium product offers exceptional quality and performance. It features state-of-the-art technology and design that sets it apart from competitors. Our premium materials ensure durability and long-lasting performance. Designed with user experience in mind, this product will exceed your expectations in every way.',
        image: 'images/spotlight-product.jpg',
        category: 'Premium',
        price: 99.99,
        rating: 5.0,
        date: new Date().toISOString().split('T')[0],
        details: [
            'Feature 1: High-quality materials for durability',
            'Feature 2: Advanced technology for superior performance',
            'Feature 3: Exceptional performance in all conditions',
            'Feature 4: User-friendly design for ease of use',
            'Feature 5: Energy efficient and environmentally friendly'
        ]
    };
    
    // Show product details in modal
    showProductDetails(spotlightProduct);
}

// Handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    // Check if email already exists
    if (subscribers.includes(email)) {
        showNewsletterMessage('You are already subscribed!', 'info');
    } else {
        // Add email to subscribers
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        
        // Show success message
        showNewsletterMessage('Thank you for subscribing!', 'success');
        
        // Clear form
        newsletterForm.reset();
    }
}

// Show newsletter message
function showNewsletterMessage(message, type) {
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 3000);
}

// Get all products (from cache or fetch)
async function getAllProducts() {
    try {
        return await fetchData();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Initial load of products
async function loadProducts() {
    try {
        const products = await getAllProducts();
        filteredProducts = products;
        updateProductsDisplay();
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="error-message">Error loading products. Please try again later.</p>';
    }
}

// Helper function to generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push('★');
    }
    
    // Add half star if needed
    if (halfStar >= 0.5) {
        stars.push('★');
    }
    
    // Add empty stars to make 5 total
    while (stars.length < 5) {
        stars.push('☆');
    }
    
    return stars.join('');
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}