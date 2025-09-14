// Course List Array - Web and Computer Programming Certificate
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming concepts.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful programmers by learning to research and call functions written by others.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// DOM elements
let courseCardsContainer;
let totalCreditsElement;
let allCoursesBtn;
let cseCoursesBtn;
let wddCoursesBtn;

// Current filter state
let currentFilter = 'all';

// Initialize the course system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    courseCardsContainer = document.querySelector('#course-cards');
    totalCreditsElement = document.querySelector('#total-credits');
    allCoursesBtn = document.querySelector('#all-courses');
    cseCoursesBtn = document.querySelector('#cse-courses');
    wddCoursesBtn = document.querySelector('#wdd-courses');

    // Check if elements exist before proceeding
    if (!courseCardsContainer || !totalCreditsElement) {
        console.error('Required DOM elements not found');
        return;
    }

    // Set up event listeners for filter buttons
    setupFilterButtons();

    // Display all courses initially
    displayCourses(courses);
    updateCredits(courses);
});


// Set up event listeners for filter buttons
function setupFilterButtons() {
    if (allCoursesBtn) {
        allCoursesBtn.addEventListener('click', () => filterCourses('all'));
    }
    if (cseCoursesBtn) {
        cseCoursesBtn.addEventListener('click', () => filterCourses('CSE'));
    }
    if (wddCoursesBtn) {
        wddCoursesBtn.addEventListener('click', () => filterCourses('WDD'));
    }
}


// Filter courses based on subject
function filterCourses(filter) {
    currentFilter = filter;
    
    let filteredCourses;
    if (filter === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === filter);
    }
    
    // Update button states
    updateFilterButtons(filter);
    
    // Display filtered courses
    displayCourses(filteredCourses);
    updateCredits(filteredCourses);
}


// Update filter button states
function updateFilterButtons(activeFilter) {
    const buttons = [allCoursesBtn, cseCoursesBtn, wddCoursesBtn];
    
    buttons.forEach(button => {
        if (button) {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Set active button
    let activeButton;
    switch(activeFilter) {
        case 'all':
            activeButton = allCoursesBtn;
            break;
        case 'CSE':
            activeButton = cseCoursesBtn;
            break;
        case 'WDD':
            activeButton = wddCoursesBtn;
            break;
    }
    
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
}


// Display courses in the DOM
function displayCourses(coursesToDisplay) {
    if (!courseCardsContainer) return;
    
    // Clear existing content
    courseCardsContainer.innerHTML = '';
    
    // Create course cards
    coursesToDisplay.forEach(course => {
        const courseCard = createCourseCard(course);
        courseCardsContainer.appendChild(courseCard);
    });
}

// Create individual course card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = `course-card ${course.completed ? 'completed' : ''}`;
    
    // Create course title
    const title = document.createElement('h3');
    title.textContent = `${course.subject} ${course.number}`;
    
    // Create course name
    const courseName = document.createElement('p');
    courseName.textContent = course.title;
    courseName.className = 'course-name';
    
    // Create credits display
    const credits = document.createElement('p');
    credits.textContent = `Credits: ${course.credits}`;
    credits.className = 'course-credits';
    
    // Create course type badge
    const type = document.createElement('span');
    type.textContent = course.subject;
    type.className = 'course-type';
    
    // Add completion status for screen readers
    if (course.completed) {
        const completedLabel = document.createElement('span');
        completedLabel.textContent = ' (Completed)';
        completedLabel.className = 'sr-only';
        title.appendChild(completedLabel);
    }
    
    // Assemble card
    card.appendChild(title);
    card.appendChild(courseName);
    card.appendChild(credits);
    card.appendChild(type);
    
    return card;
}

// Update total credits display
function updateCredits(coursesToDisplay) {
    if (!totalCreditsElement) return;
    
    const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}
