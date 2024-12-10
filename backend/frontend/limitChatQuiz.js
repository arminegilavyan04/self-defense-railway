document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const loginWarning = document.getElementById('login-warning');
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');

    // Logging to verify that elements are loaded properly
    console.log('quizLink:', quizLink, 'chatLink:', chatLink, 'vrLink:', vrLink);

    if (!isLoggedIn) {
        // Only add event listeners if elements exist
        if (quizLink && chatLink && vrLink) {
            console.log('All links exist!');
            [quizLink, chatLink, vrLink].forEach(link => {
                link.addEventListener('click', function(event) {
                    console.log('Link clicked:', link); // Log the clicked link
                    event.preventDefault(); // Prevent the default link behavior
                    loginWarning.style.display = 'block'; // Show the login warning

                    // Hide the warning after 5 seconds
                    setTimeout(function() {
                        loginWarning.style.display = 'none'; 
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
});

function loginRegister() {
    window.location.href = 'login.html';  // Redirect to the login page
}
