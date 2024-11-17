function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");

    // Clear the dynamic content container
    contentContainer.innerHTML = '';

    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    let fileName = '';
    if (page === 'home') {
        fileName = 'index.html'; // Home content
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

    // Fetch the content dynamically
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;

            // Trigger reflow or reapply styles to ensure correct layout after loading
            setTimeout(() => {
                resetLayout();
            }, 0);
            
            // Reattach event listeners for the home page if needed
            if (page === 'home') {
                // Reapply any styles or layout fixes specific to home page
                resetHomePageLayout();
            }

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

    // Handle home page content visibility
    if (page === 'home') {
        homeContent.style.display = 'block';
    } else {
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

// Function to reset layout (reflow)
function resetLayout() {
    document.body.style.visibility = 'hidden';
    setTimeout(() => {
        document.body.style.visibility = 'visible';
    }, 50);
}

// Function to reset specific home page layout (if necessary)
function resetHomePageLayout() {
    const homeContent = document.getElementById("home-content");
    // You can reset any home-specific layout styles here (e.g., margins, paddings)
    homeContent.style.margin = "0 auto";
    homeContent.style.textAlign = "center";
}

// Function to add the stylesheet dynamically
function addStylesheet(href) {
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
        return; // Don't add the stylesheet if it's already in the DOM
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
