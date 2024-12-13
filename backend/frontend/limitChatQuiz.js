document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    console.log('Is logged in:', isLoggedIn); // Log the login state

    const loginWarning = document.getElementById('login-warning');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    const getStarted = document.getElementById('get-started');

    // Navbar elements to check for logged-in access
    const navQuizLink = document.getElementById('nav-quiz-link');
    const navChatLink = document.getElementById('nav-chat-link');
    const navVrLink = document.getElementById('nav-vr-link');

    // Login-related UI elements
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    // If not logged in, restrict access to certain links
    if (!isLoggedIn) {
        // Restricting body links
        if (quizLink) {
            quizLink.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                showLoginWarning();
            });
        }
        if (chatLink) {
            chatLink.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                showLoginWarning();
            });
        }
        if (vrLink) {
            vrLink.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                showLoginWarning();
            });
        }
        if (getStarted) {
            getStarted.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                showLoginWarning();
            });
        }

        // Restricting navbar links
        if (navQuizLink) {
            navQuizLink.addEventListener('click', function(event) {
                event.preventDefault();
                showLoginWarning();
            });
        }
        if (navChatLink) {
            navChatLink.addEventListener('click', function(event) {
                event.preventDefault();
                showLoginWarning();
            });
        }
        if (navVrLink) {
            navVrLink.addEventListener('click', function(event) {
                event.preventDefault();
                showLoginWarning();
            });
        }

        // Show login/register UI
        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
        // If logged in, show these UI elements
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        loginWarning.style.display = 'none';
    }

    // Function to show login warning
    function showLoginWarning() {
        loginWarning.style.display = 'block'; // Show the login warning
        setTimeout(function() {
            loginWarning.style.display = 'none'; // Hide the warning after 5 seconds
        }, 5000);
    }

    // Add validation for anchor links inside .about-text-container (or any other section)
    const aboutContainerLinks = document.querySelectorAll('.about-text-container a');

    aboutContainerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!isLoggedIn) {
                event.preventDefault(); // Prevent the default link behavior
                showLoginWarning();
            }
        });
    });

    // Manage active state in the navbar when user is logged in
    const navLinks = document.querySelectorAll('.nav-links li a');
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
