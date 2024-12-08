window.onload = function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    // Get the warning element
    const loginWarning = document.getElementById('login-warning');
    
    // Get the links for Quiz and Chat
    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    
    // Get elements related to authentication (Login/Register or Person Icon)
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');
    
    // If user is not logged in, block navigation and show Login/Register button
    if (!isLoggedIn) {
        // Prevent navigation for Quiz, Chat, VR links
        [quizLink, chatLink, vrLink].forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                loginWarning.style.display = 'block';  // Show the login warning
                setTimeout(function() {
                    loginWarning.style.display = 'none';
                }, 5000); // Hide the warning after 5 seconds
            });
        });

        // Show Login/Register button and hide Person Icon
        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
        // If logged in, show Person Icon and hide Login/Register button
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        
        // Hide the login warning
        loginWarning.style.display = 'none';
    }
};

// Function for Login/Register action
function loginRegister() {
    // Show the login/register modal or trigger the login/register page logic
    window.location.href = 'login.html';  // Or show the login modal directly
}

// Function for logout action
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('user');
    window.location.reload(); // Reload the page to update UI
}
