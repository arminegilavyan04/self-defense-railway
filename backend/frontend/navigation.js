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
        fileName = 'index.html'; // Home content
        if (!document.querySelector('link[href="canv.css"]')) {
            stylesheetsToAdd.push('canv.css'); // If home.css isn't in the head, add it
        }
        homeContent.style.display = 'block';
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'vr') {
        fileName = 'vr.html';
    } else if (page === 'chat') {
        fileName = 'chat.html'; // Do not reload content for chat, just show it dynamically
        loadChatSection(); // Load the chat section dynamically here
    } else if (page === 'quiz') {
        fileName = 'quiz_1.html'; // Load quiz page dynamically without page refresh
        loadQuizPage(); // This will load the quiz dynamically without reloading the page
    } else if (page === 'login') {
        fileName = 'login.html';
        addStylesheet('login.css');
    }

    // Apply the required stylesheets dynamically
    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages (excluding home)
    if (page !== 'home' && page !== 'quiz' && page !== 'chat') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
                // You can add additional logic for each page as needed
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

function loadChatSection() {
    const contentContainer = document.getElementById("dynamic-content");
    contentContainer.innerHTML = `
        <div id="chatSection" class="page-content">
            <h2>Welcome to the Chat Section</h2>
            <p>This is where the chat interface will appear.</p>
            <!-- Insert your chat UI or app content here -->
        </div>
    `;

    // Update the active navigation link for the "Chat" page
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    const chatLink = document.querySelector('a[href="javascript:void(0);"][onclick="loadPage(\'chat\')"]');
    if (chatLink) chatLink.classList.add('active');
}

function loadQuizPage() {
    // Dynamically load the quiz section here
    const contentContainer = document.getElementById("dynamic-content");
    contentContainer.innerHTML = `
        <div id="quizContainer">
            <!-- Quiz will be loaded here -->
        </div>
        <button id="nextButton" class="btn btn-primary" style="display:none;">Next</button>
        <button id="retryButton" class="btn btn-secondary" style="display:none;">Retry</button>
        <button id="finalSubmissionButton" class="btn btn-success" style="display:none;">Final Submission</button>
        <div id="validationMessage" class="text-danger"></div>
        <div id="result"></div>
    `;
    loadQuiz();  // Call the loadQuiz function to load the questions
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
