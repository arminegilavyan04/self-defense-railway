document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    const loginWarning = document.getElementById('login-warning');
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    
    // Log the elements to verify they exist
    console.log('quizLink:', quizLink, 'chatLink:', chatLink, 'vrLink:', vrLink);

    if (!isLoggedIn) {
        // Display the login/register button and hide the person icon
        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
        
        // Only add event listeners to links if they exist
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
    } else {
        // If logged in, hide the login/register button and show the person icon
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        loginWarning.style.display = 'none';
    }

    // Add event listener for the login/register button
    loginRegisterBtn.addEventListener('click', function() {
        window.location.href = 'login.html';  // Redirect to the login page
    });

    // Handle link clicks within the "About Us" content (to prevent default behavior if not logged in)
    const linksContainer = document.querySelector('.about-text-container');
    linksContainer.addEventListener('click', function(event) {
        const target = event.target;
        // Check if the clicked element is an anchor tag (and user is not logged in)
        if (target.tagName === 'A' && !isLoggedIn) {
            event.preventDefault();  // Prevent the default link behavior
            loginWarning.style.display = 'block'; // Show the login warning

            // Hide the warning after 5 seconds
            setTimeout(function() {
                loginWarning.style.display = 'none';
            }, 5000);
        }
    });
});

function loginRegister() {
    window.location.href = 'login.html';  // Redirect to the login page
}
