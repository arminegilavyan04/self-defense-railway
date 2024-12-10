window.onload = function () {
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    const loginWarning = document.getElementById('login-warning');

    const quizLink = document.getElementById('quiz-link');
    const chatLink = document.getElementById('chat-link');
    const vrLink = document.getElementById('vr-link');
    
    const loginRegisterBtn = document.getElementById('login-register-btn');
    const personIconContainer = document.getElementById('person-icon-container');
    
    if (!isLoggedIn) {

        [quizLink, chatLink, vrLink].forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                loginWarning.style.display = 'block';  
                setTimeout(function() {
                    loginWarning.style.display = 'none';
                }, 5000); 
            });
        });

        
        loginRegisterBtn.style.display = 'block';
        personIconContainer.style.display = 'none';
    } else {
        
        loginRegisterBtn.style.display = 'none';
        personIconContainer.style.display = 'block';
        
        loginWarning.style.display = 'none';
    }
};

function loginRegister() {
    
    window.location.href = 'login.html';  
}

