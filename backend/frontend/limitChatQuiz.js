document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    console.log('Is logged in:', isLoggedIn);

    const loginWarning = document.getElementById('login-warning');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    const getStarted = document.getElementById('get-started');

    const navQuizLink = document.getElementById('nav-quiz-link');
    const navChatLink = document.getElementById('nav-chat-link');
    const navVrLink = document.getElementById('nav-vr-link');

    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');

    if (!isLoggedIn) {
        if (quizLink) {
            quizLink.addEventListener('click', function(event) {
                event.preventDefault(); 
                showLoginWarning();
            });
        }
        if (chatLink) {
            chatLink.addEventListener('click', function(event) {
                event.preventDefault(); 
                showLoginWarning();
            });
        }
        if (vrLink) {
            vrLink.addEventListener('click', function(event) {
                event.preventDefault(); 
                showLoginWarning();
            });
        }
        if (getStarted) {
            getStarted.addEventListener('click', function(event) {
                event.preventDefault(); 
                showLoginWarning();
            });
        }

        
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

        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
        
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        loginWarning.style.display = 'none';
    }

    function showLoginWarning() {
        loginWarning.style.display = 'block'; 
        setTimeout(function() {
            loginWarning.style.display = 'none'; 
        }, 5000);
    }

    
    const aboutContainerLinks = document.querySelectorAll('.about-text-container a');
    aboutContainerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (!isLoggedIn) {
                event.preventDefault(); 
                showLoginWarning();
            }
        });
    });
});