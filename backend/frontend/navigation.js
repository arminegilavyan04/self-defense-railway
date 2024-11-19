function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");

    // Clear dynamic content container to avoid content duplication
    contentContainer.innerHTML = '';

    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    let fileName = '';
    let stylesheetsToAdd = [];

    // Determine which page to load and ensure relevant styles are applied
    if (page === 'home') {
        fileName = ''; // No need to fetch anything for the home page

        // Ensure home page styles are applied
        if (!document.querySelector('link[href="canv.css"]')) {
            stylesheetsToAdd.push('canv.css'); // If home.css isn't in the head, add it
        }

        // Show home page content
        homeContent.style.display = 'block';  
        contentContainer.innerHTML = '';  // Clear content for home
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
    } else if (page === 'getStarted') {
        fileName = 'login.html';
        addStylesheet('login.css');
    }

    // Apply the required stylesheets dynamically
    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages (except "home")
    if (page !== 'home') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;

                // If quiz page is loaded, handle quiz behavior
                if (page === 'quiz') {
                    setupQuizPage();  // This function will be used to set up quiz logic
                }

                // Reattach necessary event listeners after dynamic content load
            })
            .catch(error => {
                contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
                console.error('Error loading page content:', error);
            });
    }

    // Hide home content on non-home pages
    if (page !== 'home') {
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

// Function to add the stylesheet dynamically
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

// Setup Quiz Page (Quiz behavior logic)
function setupQuizPage() {
    // When the Quiz page is loaded, only show the "Start Quiz" button initially
    const startButton = document.querySelector('.start-quiz-btn');
    startButton.style.display = 'block';
    startButton.addEventListener('click', function() {
        // Hide the "Start Quiz" button and show quiz questions dynamically
        startButton.style.display = 'none';
        loadQuizQuestions();  // This function will load the quiz questions
    });
}

// Function to load quiz questions
function loadQuizQuestions() {
    const contentContainer = document.getElementById('dynamic-content');

    fetch('quiz_content.html')  // Load the quiz content (questions, etc.)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
            // Initialize the quiz using the quiz.js file
            initializeQuiz();  // This function will initialize the quiz logic
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Sorry, we couldn't load the quiz content.</p>";
            console.error('Error loading quiz content:', error);
        });
}

// Function to initialize quiz (and handle final submission, etc.)
function initializeQuiz() {
    // You can add your quiz initialization logic here,
    // such as displaying questions, handling the next button, etc.
    // Once the quiz is completed, you can show the chat page:
    
    const finalSubmissionButton = document.getElementById('finalSubmissionButton');
    finalSubmissionButton.addEventListener('click', function() {
        // Show chat page content after final submission
        loadChatPage();
    });
}

// Function to load the chat page after quiz completion
function loadChatPage() {
    const contentContainer = document.getElementById('dynamic-content');
    fetch('chat.html')
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Sorry, we couldn't load the chat page.</p>";
            console.error('Error loading chat content:', error);
        });
}
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
    // Ensure the login and register forms are visible
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';

    // Show the selected form
    if (form === 'login') {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('loginTab').classList.add('active');
        document.getElementById('registerTab').classList.remove('active');
    } else if (form === 'register') {
        document.getElementById('registerForm').style.display = 'block';
        document.getElementById('registerTab').classList.add('active');
        document.getElementById('loginTab').classList.remove('active');
    }
}