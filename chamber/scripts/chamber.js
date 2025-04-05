// Toggle hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
hamburgerBtn.setAttribute('aria-label', 'Toggle Navigation Menu'); // ✅ ADDED for accessibility
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerBtn.textContent = hamburgerBtn.textContent === '☰' ? '✕' : '☰';
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        primaryNav.classList.remove('open');
        hamburgerBtn.textContent = '☰';
    }
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode'); // ✅ ADDED for accessibility
const body = document.body;

const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;