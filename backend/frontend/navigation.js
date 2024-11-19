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

    // Determine which page to load
    if (page === 'home') {
        homeContent.style.display = 'block';  
        contentContainer.innerHTML = '';  // Clear content for dynamic loading
        return;
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'vr') {
        fileName = 'vr-glasses.html';
    } else if (page === 'chat') {
        fileName = 'chat.html';
    } else if (page === 'quiz') {
        loadQuiz();  // Directly load the quiz content here without fetch
        return;
    } else if (page === 'login') {
        fileName = 'login.html';
        addStylesheet('login.css');
    } else if (page === 'getStarted') {
        fileName = 'login.html';
        addStylesheet('login.css');
    }

    // Dynamically fetch content for non-home pages (except quiz)
    if (page !== 'home' && page !== 'quiz') {
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
            })
            .catch(error => {
                contentContainer.innerHTML = `<p>Sorry, we couldn't load the requested page. Error: ${error.message}</p>`;
                console.error('Error loading page content:', error);
            });
    }

    // Function to add a stylesheet if not already added
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

    // Function to load the quiz content dynamically
    function loadQuiz() {
        contentContainer.innerHTML = `
            <div id="quizPage" class="page-content">
                <h2>Self-Defense Quiz</h2>
                <div id="quizContainer"></div>
                <div id="validationMessage"></div>
                <div id="nextButton" style="display:none;" onclick="nextQuestion()">Next Question</div>
                <div id="retryButton" style="display:none;" onclick="retryQuiz()">Retry Quiz</div>
                <div id="finalSubmissionButton" style="display:none;" onclick="submitQuiz()">Submit Quiz</div>
                <div id="result"></div>
            </div>
        `;
        // Initialize the quiz after injecting the HTML content
        initializeQuiz();
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

    // Optionally, update the browser's history
    history.pushState({ page: page }, page, `#${page}`);
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

    