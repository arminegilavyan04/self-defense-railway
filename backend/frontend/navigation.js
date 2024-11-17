function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");

    // Clear previous content in the dynamic content container
    contentContainer.innerHTML = '';

    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Load different content based on the page clicked
    let fileName = '';
    if (page === 'home') {
        fileName = 'index.html'; // Assuming 'home.html' is a valid file
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
    } else if (page === 'getStarted') {
        fileName = 'login.html';
    }

    // Use fetch to load the content of the selected HTML file
    fetch(fileName)
        .then(response => response.text())  // Convert the response to text (HTML content)
        .then(data => {
            contentContainer.innerHTML = data;  // Insert the fetched content into the page
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
            console.error('Error loading page content:', error);
        });

    // Add the active class to the clicked navigation link
    navLinks.forEach(link => {
        // Compare the page name with the text content of the links (like 'Home', 'About Us', etc.)
        if (link.textContent.trim().toLowerCase() === page) {
            link.classList.add('active');
        }
    });

    // Optionally, update the browser's history (so the URL changes without page reload)
    history.pushState({ page: page }, page, `#${page}`);
}

// Listen for back/forward navigation and load content dynamically
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        loadPage(event.state.page);
    }
});


   

/// Function to switch between Login and Register forms
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
