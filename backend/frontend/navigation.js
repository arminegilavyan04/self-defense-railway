// Function to load the content dynamically
function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");

    // Clear previous content in the dynamic content container
    contentContainer.innerHTML = '';

    if (page === 'login') {
        // Load the login page content dynamically (in this case, login.html)
        fetch('login.html')
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data; // Inject login.html content

                // Optionally, switch to the login form by default
                switchForm('login'); // Show the login form by default
            })
            .catch(error => {
                contentContainer.innerHTML = "<p>Sorry, we couldn't load the login form.</p>";
            });
    } else if (page === 'home') {
        // Home page content can be loaded if necessary
        contentContainer.innerHTML = "<h2>Welcome Home</h2><p>Home content goes here.</p>";
    } else if (page === 'about') {
        contentContainer.innerHTML = "<h2>About Us</h2><p>About us content goes here.</p>";
    }
    // Add more cases for other sections like 'chat', etc.
}

   

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
