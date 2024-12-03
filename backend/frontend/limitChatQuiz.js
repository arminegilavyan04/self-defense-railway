window.onload = function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    // Get the warning element
    const loginWarning = document.getElementById('login-warning');
    
    // Get the links for Quiz and Chat
    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    
    // If user is not logged in, block navigation
    if (!isLoggedIn) {
        // Prevent navigation for Quiz link
        quizLink.addEventListener('click', function(event) {
            event.preventDefault();
            loginWarning.style.display = 'block';  // Show the login warning
            setTimeout(function() {
                loginWarning.style.display = 'none';
            }, 5000); // Hide the warning after 5 seconds
        });

        // Prevent navigation for Chat link
        chatLink.addEventListener('click', function(event) {
            event.preventDefault();
            loginWarning.style.display = 'block';  // Show the login warning
            setTimeout(function() {
                loginWarning.style.display = 'none';
            }, 5000); // Hide the warning after 5 seconds
        });
    } else {
        // If logged in, remove the warning
        loginWarning.style.display = 'none';
    }
};