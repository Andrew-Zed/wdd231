// JavaScript for course information display

document.addEventListener('DOMContentLoaded', function() {
    // Array of course objects provided for the assignment
    const courses = [
        {
            code: "CSE 110",
            name: "Programming Building Blocks",
            credits: 3,
            completed: true
        },
        {
            code: "CSE 111",
            name: "Programming with Functions",
            credits: 3,
            completed: true
        },
        {
            code: "CSE 210",
            name: "Programming with Classes",
            credits: 3,
            completed: false
        },
        {
            code: "WDD 130",
            name: "Web Fundamentals",
            credits: 3,
            completed: true
        },
        {
            code: "WDD 131",
            name: "Web Fundamentals Hands-on",
            credits: 1,
            completed: true
        },
        {
            code: "WDD 231",
            name: "Web Frontend Development I",
            credits: 3,
            completed: false
        }
    ];
    
    // DOM elements
    const courseContainer = document.getElementById('course-container');
    const totalCreditsElement = document.getElementById('total-credits');
    const allButton = document.getElementById('all-btn');
    const cseButton = document.getElementById('cse-btn');
    const wddButton = document.getElementById('wdd-btn');
    
    // Function to display courses based on filter
    function displayCourses(courseList) {
        // Clear the current course container
        courseContainer.innerHTML = '';
        
        // Calculate total credits for the filtered courses
        const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
        totalCreditsElement.textContent = totalCredits;
        
        // Create and append course cards
        courseList.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseCard.textContent = course.code;
            courseContainer.appendChild(courseCard);
        });
    }
    
    // Event listeners for filter buttons
    allButton.addEventListener('click', function() {
        displayCourses(courses);
    });
    
    cseButton.addEventListener('click', function() {
        const cseList = courses.filter(course => course.code.includes('CSE'));
        displayCourses(cseList);
    });
    
    wddButton.addEventListener('click', function() {
        const wddList = courses.filter(course => course.code.includes('WDD'));
        displayCourses(wddList);
    });
    
    // Initial display of all courses
    displayCourses(courses);
});