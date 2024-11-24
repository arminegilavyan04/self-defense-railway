function addStylesheet(href) {
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
        return;  // Don't add the stylesheet if it's already in the DOM
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => {
        console.log(`${href} loaded successfully.`);
    };
    link.onerror = () => {
        console.error(`Error loading ${href}`);
    };
    document.head.appendChild(link);
}

function cleanupQuiz() {
    // Reset quiz-related content and state
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.innerHTML = '';  // Clear quiz questions and options
    }
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = '';  // Clear any displayed result
    }
    // Hide or reset any quiz-related buttons
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';
    document.getElementById('finalSubmissionButton').style.display = 'none';
    document.getElementById('validationMessage').innerHTML = '';
}
function addScript(src) {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        return;  // Don't add the script if it's already in the DOM
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        console.log(`${src} loaded successfully.`);
    };
    script.onerror = () => {
        console.error(`Error loading ${src}`);
    };
    document.body.appendChild(script);
}


// Your loadPage function
function loadPage(page) {
    console.log('Loading page:', page);
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");
    const mainContent = document.getElementById("main-content");

    
    // Clear dynamic content container to avoid duplication
    contentContainer.innerHTML = '';

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    let fileName = '';
    let stylesheetsToAdd = [];

    // Handle page loading logic
    if (page === 'home') {
        // Instead of fetching 'home.html', just show the home content
        contentContainer.innerHTML = mainContent.innerHTML;
        history.pushState({ page: page }, page, `#${page}`);  // Update URL without reloading
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'vr') {
        fileName = 'vr-glasses.html';
    } else if (page === 'chat') {
        fileName = 'chat.html';
    } else if (page === 'quiz') {
        fileName = 'quiz.html';
    } else if (page === 'login') {
        fileName = 'login.html';
        addStylesheet('login.css');
        addScript('script.js');
    } else if (page === 'logout') {
        fileName = 'index.html';
    } else if (page === 'getStarted') {
        fileName = 'quiz.html';
    }

    // Apply the required stylesheets dynamically
    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages
    if (page !== 'home') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;

                // After content is loaded, reattach event listeners for login/register tabs and form switching
                if (page === 'login') {
                    switchForm('login'); // Switch to the login form by default
                    attachTabSwitchEventListeners(); // Reattach tab switching listeners
                }
            })
            .catch(error => {
                contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
                console.error('Error loading page content:', error);
            });
    }

    // Hide home content on non-home pages
    if (page !== 'home' && homeContent) {
        homeContent.style.display = 'none';
    }

    // Add the active class to the clicked navigation link
    navLinks.forEach(link => {
        if (link.textContent.trim().toLowerCase() === page) {
            link.classList.add('active');
        }
    });

    // Optionally, update the browser's history (so the URL changes without page reload)
    history.pushState({ page: page }, page, `#${page}`);
}


// Function to attach event listeners for switching between Login and Register forms
function attachTabSwitchEventListeners() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (loginTab) {
        loginTab.addEventListener('click', () => switchForm('login'));
    }

    if (registerTab) {
        registerTab.addEventListener('click', () => switchForm('register'));
    }
}

// Function to switch between Login and Register forms
function switchForm(form) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    // Hide both forms first
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';

    // Switch to the selected form
    if (form === 'login' && loginForm) {
        loginForm.style.display = 'block'; // Show login form
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else if (form === 'register' && registerForm) {
        registerForm.style.display = 'block'; // Show register form
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}
