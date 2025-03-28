// Directory page JavaScript
debugger
// Display modes
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const directory = document.getElementById('directory');

// Event listeners for view toggle
gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    
    // Save preference to local storage
    localStorage.setItem('directoryView', 'grid');
});

listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    
    // Save preference to local storage
    localStorage.setItem('directoryView', 'list');
});

// Fetch data from JSON file
async function getDirectoryData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error(`Fetch problem: ${error.message}`);
        // Display a user-friendly error message
        directory.innerHTML = `
            <div class="error-message">
                <p>We're having trouble loading the directory data.</p>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Display member cards
function displayMembers(members) {
    directory.innerHTML = ''; // Clear container
    
    members.forEach(member => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        
        // Get membership level name
        let membershipLevel = 'Member';
        let membershipClass = 'member';
        
        if (member.membershipLevel === 2) {
            membershipLevel = 'Silver';
            membershipClass = 'silver';
        } else if (member.membershipLevel === 3) {
            membershipLevel = 'Gold';
            membershipClass = 'gold';
        }
        
        // Build card content
        card.innerHTML = `
            <div class="card-image">
                <img src="images/members/${member.image}" alt="${member.name}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="badge ${membershipClass}">${membershipLevel}</span>
                <h3>${member.name}</h3>
                <div class="card-info">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Website</a></p>
                </div>
                <div class="card-link">
                    <a href="${member.website}" target="_blank">Visit</a>
                </div>
            </div>
        `;
        
        directory.appendChild(card);
    });
}

// Check for saved view preference
const savedView = localStorage.getItem('directoryView');
if (savedView === 'list') {
    listBtn.click();
} else {
    gridBtn.click(); // Default to grid view
}

// Load the data when the page is ready
document.addEventListener('DOMContentLoaded', getDirectoryData);