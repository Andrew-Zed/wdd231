// data.js - Module for handling data fetching and processing

// URL to your JSON data (replace with your actual data source)
const DATA_URL = 'data/items.json';

// Fetch data from the source
async function fetchData() {
    try {
        // Use localStorage to cache data
        const cachedData = localStorage.getItem('cachedData');
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');
        const currentTime = new Date().getTime();
        
        // Check if we have cached data that's less than 1 hour old
        if (cachedData && cachedTimestamp && (currentTime - cachedTimestamp < 3600000)) {
            console.log('Using cached data');
            return JSON.parse(cachedData);
        }
        
        // Fetch new data
        const response = await fetch(DATA_URL);
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse JSON data
        const data = await response.json();
        
        // Cache the data and timestamp
        localStorage.setItem('cachedData', JSON.stringify(data));
        localStorage.setItem('cachedTimestamp', currentTime.toString());
        
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to filter data based on criteria
function filterData(data, filterCriteria) {
    return data.filter(item => {
        // Example filtering logic - modify according to your data structure
        if (filterCriteria.category && item.category !== filterCriteria.category) {
            return false;
        }
        
        if (filterCriteria.minRating && item.rating < filterCriteria.minRating) {
            return false;
        }
        
        // Add more filtering conditions as needed
        
        return true;
    });
}

// Function to sort data
function sortData(data, sortBy = 'name', sortOrder = 'asc') {
    return [...data].sort((a, b) => {
        let comparison = 0;
        
        // Sort based on the specified property
        if (a[sortBy] < b[sortBy]) {
            comparison = -1;
        } else if (a[sortBy] > b[sortBy]) {
            comparison = 1;
        }
        
        // Reverse if descending order is requested
        return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
}

// Function to search data
function searchData(data, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return data;
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    return data.filter(item => {
        // Search in multiple properties - modify according to your data structure
        return (
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(term)))
        );
    });
}

// Export functions to be used in other modules
export { fetchData, filterData, sortData, searchData };