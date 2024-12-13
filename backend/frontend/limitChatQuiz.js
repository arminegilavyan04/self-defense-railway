document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    console.log('Is logged in:', isLoggedIn); // Log the login state

    const loginWarning = document.getElementById('login-warning');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    const getStarted = document.getElementById('get-started');

    console.log(quizLink, chatLink, vrLink); // Log elements to see if they exist

    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    if (!isLoggedIn) {
        // Only add event listeners if elements exist
        if (quizLink && chatLink && vrLink && getStarted) {
            [quizLink, chatLink, vrLink, getStarted].forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    loginWarning.style.display = 'block'; // Show the login warning
                    setTimeout(function() {
                        loginWarning.style.display = 'none'; // Hide the warning after 5 seconds
                    }, 5000); 
                });
            });
        } else {
            console.error('Links not found!');
        }

        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
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
});

function loginRegister() {
    window.location.href = 'login.html';  // Redirect to the login page
}
