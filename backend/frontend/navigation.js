function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");

    // Clear the dynamic content container if not navigating to home
    contentContainer.innerHTML = '';

    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    let fileName = '';
    let shouldLoadStylesheet = false;

    // Determine the page and set the corresponding file
    if (page === 'home') {
        fileName = 'index.html';
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'vr') {
        fileName = 'vr.html';
    } else if (page === 'chat') {
        fileName = 'chat.html';
    } else if (page === 'quiz') {
        fileName = 'quiz_1.html';
    } else if (page === 'login' || page === 'getStarted') {
        fileName = 'login.html';
        shouldLoadStylesheet = true; // Indicate that login.css should be loaded
    }

    // If we're on the home page, display it statically
    if (page === 'home') {
        homeContent.style.display = 'block';
        contentContainer.style.display = 'none'; // Hide dynamic content
        return; // Exit function without trying to load dynamic content
    }

    // Hide home content if we're not on the home page
    homeContent.style.display = 'none';
    contentContainer.style.display = 'block';

    // If login page or getStarted, load the stylesheet dynamically
    if (shouldLoadStylesheet) {
        addStylesheet('login.css');
    }

    // Fetch and load dynamic page content
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
            
            // After content is loaded, reattach event listeners for login/register tabs and form switching
            if (page === 'login' || page === 'getStarted') {
                switchForm('login'); // Default to showing the login form
                attachTabSwitchEventListeners(); // Reattach the tab switching event listeners
            }
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
            console.error('Error loading page content:', error);
        });

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
