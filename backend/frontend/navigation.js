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

    if (page === 'home') {
        // For the home page, we want to ensure the home page CSS is applied
        fileName = 'index.html'; // Home content

        // Ensure the home page styles are applied if not already present
        if (!document.querySelector('link[href="home.css"]')) {
            stylesheetsToAdd.push('home.css');
        }

        // If the home page content is already visible, we don't want to load it again, just ensure the layout is correct.
        homeContent.style.display = 'block';  // Ensure home content is visible
        contentContainer.innerHTML = ''; // Clear dynamic content to avoid duplication.
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'vr') {
        fileName = 'vr.html';
    } else if (page === 'chat') {
        fileName = 'chat.html';
    } else if (page === 'quiz') {
        fileName = 'quiz_1.html';
    } else if (page === 'login') {
        fileName = 'login.html';
        addStylesheet('login.css');
    } else if (page === 'getStarted') {
        fileName = 'login.html';
        addStylesheet('login.css');
    }

    // Load the necessary stylesheets for the page
    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages
    if (page !== 'home') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;

                // After content is loaded, reattach event listeners for login/register tabs and form switching
                if (page === 'login' || page === 'getStarted') {
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

// Function to attach event listeners for switching between login and register forms
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
