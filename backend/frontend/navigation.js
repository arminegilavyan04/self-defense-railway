// Function to dynamically add a stylesheet

// Handle page loading and dynamic content insertion
function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");

    // Always load the navigation panel (navbar)
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    let fileName = '';
    let stylesheetsToAdd = [];

    // Determine which page to load and ensure relevant styles are applied
    if (page === 'home') {
        fileName = 'index.html'; // Home content
        if (!document.querySelector('link[href="canv.css"]')) {
            stylesheetsToAdd.push('canv.css'); // If home.css isn't in the head, add it
        }

        // Only show homeContent and don't clear the content container
        if (homeContent) {
            homeContent.style.display = 'block';
        }
        return; // Do not clear the content container when loading the home page

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
    }
    else if (page === 'getStarted') {
        fileName = 'login.html';
        addStylesheet('login.css');
    }

    // Clear content container only when switching away from the home page
    contentContainer.innerHTML = '';

    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages
    if (page !== 'home') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
            })
            .catch(error => {
                contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
                console.error('Error loading page content:', error);
            });
    }

    // Hide home content if navigating to another page
    if (page !== 'home' && homeContent) {
        homeContent.style.display = 'none';
    }

    // Add the active class to the clicked navigation link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.textContent.trim().toLowerCase() === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Optionally, update the browser's history (so the URL changes without page reload)
    history.pushState({ page: page }, page, `#${page}`);
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




}

// Listen to the popstate event to handle browser back/forward navigation

