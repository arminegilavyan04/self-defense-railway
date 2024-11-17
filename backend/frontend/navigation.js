function loadPage(page) {
    const contentContainer = document.getElementById("dynamic-content");

    // Clear previous content in the dynamic content container
    contentContainer.innerHTML = '';

    // Remove the active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Define the file name for each page
    let fileName = '';
    if (page === 'home') {
        fileName = 'home.html';  // External file for home page
    } else if (page === 'about') {
        fileName = 'about.html';  // External file for about page
    } else if (page === 'vr') {
        fileName = 'vr.html';  // External file for VR page
    } else if (page === 'chat') {
        fileName = 'chat.html';  // External file for chat page
    } else if (page === 'quiz') {
        fileName = 'quiz.html';  // External file for quiz page
    } else if (page === 'login') {
        fileName = 'login.html';  // External file for login page
    } else if (page === 'getStarted') {
        fileName = 'getStarted.html';  // External file for get started page
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

    // Set the active class on the clicked navigation link
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === page) {
            link.classList.add('active');
        }
    });
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
