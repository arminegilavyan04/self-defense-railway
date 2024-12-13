document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    console.log('Is logged in:', isLoggedIn); // Log the login state

    const loginWarning = document.getElementById('login-warning');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    const getStarted = document.getElementById('get-started');

    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    // Manage visibility of elements based on login status
    if (!isLoggedIn) {
        // Restrict access to certain links
        [quizLink, chatLink, vrLink, getStarted].forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                loginWarning.style.display = 'block'; // Show the login warning
                setTimeout(function() {
                    loginWarning.style.display = 'none'; // Hide the warning after 5 seconds
                }, 5000); 
            });
        });

        // Display login-related UI
        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
        // Logged-in state
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        loginWarning.style.display = 'none';
    }

    // Add validation for anchor links inside .about-text-container
    const aboutContainerLinks = document.querySelectorAll('.about-text-container a');

    aboutContainerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!isLoggedIn) {
                event.preventDefault(); // Prevent the default link behavior
                loginWarning.style.display = 'block'; // Show the login warning
                setTimeout(function() {
                    loginWarning.style.display = 'none'; // Hide the warning after 5 seconds
                }, 5000);
            }
        });
    });

    // Get all the links in the navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    // Loop through the links to check which one matches the current page URL
    navLinks.forEach(link => {
        // Only proceed with adding the active class if the user is logged in
        if (isLoggedIn) {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to the link that matches the current URL
            if (window.location.pathname.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        } else {
            // Optionally, prevent activation of navigation links when not logged in
            link.classList.remove('active');
        }
    });
});

