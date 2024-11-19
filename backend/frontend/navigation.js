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

    // Always load the navigation panel (navbar)
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    navbarPlaceholder.innerHTML = `
      <div class="logo">Logo/SelfSense</div>
      <ul class="nav-links">
          <li><a href="javascript:void(0);" onclick="loadPage('home')" class="active">Home</a></li>
          <li><a href="javascript:void(0);" onclick="loadPage('about')">About Us</a></li>
          <li><a href="javascript:void(0);" onclick="loadPage('vr')">VR Glasses</a></li>
          <li><a href="javascript:void(0);" onclick="loadPage('chat')">Chat</a></li>
          <li><a href="javascript:void(0);" onclick="loadPage('quiz')">Quiz</a></li>
      </ul>
      <div class="login-register">
        <a href="javascript:void(0);" onclick="loadPage('login')">Login/Register</a>
      </div>
      <div class="person-icon">
        <img src="person-icon.png" alt="Person Icon">
      </div>
      <div class="flag-icon">
        <img src="armenian-flag.png" alt="Armenian Flag">
      </div>
    `;

    let fileName = '';
    let stylesheetsToAdd = [];

    // Determine which page to load and ensure relevant styles are applied
    if (page === 'home') {
        fileName = 'index.html'; // Home content
        if (!document.querySelector('link[href="canv.css"]')) {
            stylesheetsToAdd.push('canv.css'); // If canv.css isn't in the head, add it
        }
        if (homeContent) {
            homeContent.style.display = 'block';
        }
        contentContainer.innerHTML = ''; // Clear any dynamic content
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

    // Add stylesheets dynamically
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
    navLinks.forEach(link => {
        if (link.textContent.trim().toLowerCase() === page.toLowerCase()) {
            link.classList.add('active');
        }
    });

    // Optionally, update the browser's history (so the URL changes without page reload)
    history.pushState({ page: page }, page, `#${page}`);

    // If navigating to the login page, ensure form switching functionality is available
    if (page === 'login') {
        attachTabSwitchEventListeners(); // Ensure tab switches work on login page
    }
}

// Add stylesheet dynamically
function addStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Switch between login and register forms
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

// Switch form visibility
function switchForm(form) {
    // Ensure the login and register forms are visible
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    if (loginForm && registerForm && loginTab && registerTab) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';

        // Show the selected form
        if (form === 'login') {
            loginForm.style.display = 'block';
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
        } else if (form === 'register') {
            registerForm.style.display = 'block';
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
        }
    }
}

// Listen to the popstate event to handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
});
