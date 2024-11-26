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

function cleanupQuiz() {
    // Reset quiz-related content and state
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.innerHTML = '';  // Clear quiz questions and options
    }
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = '';  // Clear any displayed result
    }
    // Hide or reset any quiz-related buttons
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('retryButton').style.display = 'none';
    document.getElementById('finalSubmissionButton').style.display = 'none';
    document.getElementById('validationMessage').innerHTML = '';
}

function addScript(src, callback) {
        if (typeof jQuery === 'undefined') {
            console.error('jQuery is not loaded!');
            // Optionally, you can stop executing the rest of the script if jQuery is not available.
        } else {
            // Your script logic that uses jQuery
            $(document).ready(function() {
                // Your existing jQuery-dependent code goes here
            });
        }
   
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            console.log(`${src} is already loaded.`);
            if (callback) callback();  // Call the callback immediately if the script is already loaded
            return;  // Don't add the script if it's already in the DOM
        }
    
        // If the script being added is script.js, ensure jQuery is loaded first
        if (src === 'script.js' && !window.jQuery) {
            console.log("jQuery is not loaded, loading jQuery first...");
    
            // If jQuery is not loaded, load it first
            const jqueryScript = document.createElement('script');
            jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    
            // Ensure script.js is only loaded after jQuery is fully loaded
            jqueryScript.onload = function() {
                console.log("jQuery loaded successfully.");
                // Once jQuery is loaded, load script.js
                addScript(src, callback);
            };
    
            jqueryScript.onerror = function() {
                console.error('Error loading jQuery');
            };
    
            document.body.appendChild(jqueryScript);
            return;  // Prevent adding script.js until jQuery is loaded
        }
    
        // Now add the requested script
        const script = document.createElement('script');
        script.src = src;
    
        // Define the load and error handlers
        script.onload = function() {
            console.log(`${src} loaded successfully.`);
            if (callback) callback();  // Execute the callback when the script is loaded
        };
    
        script.onerror = function() {
            console.error(`Error loading ${src}`);
        };
    
        // Append the script to the document body
        document.body.appendChild(script);
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

// Function to switch between Login and Register forms
function switchForm(form) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    // Hide both forms first
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';

    // Switch to the selected form
    if (form === 'login' && loginForm) {
        loginForm.style.display = 'block'; // Show login form
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else if (form === 'register' && registerForm) {
        registerForm.style.display = 'block'; // Show register form
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('show'); // Toggle the "show" class to show/hide the menu
  }

  // Close dropdown if clicked outside the dropdown
  window.onclick = function(event) {
    const dropdown = document.getElementById('dropdown-menu');
    const personIcon = document.querySelector('.person-icon');
    if (!personIcon.contains(event.target)) {
      dropdown.classList.remove('show'); // Hide dropdown if click is outside the icon
    }
  }

  function loadPage(page) {
    
    const contentContainer = document.getElementById("dynamic-content");
    const homeContent = document.getElementById("home-content");
    const mainContent = document.getElementById("main-content");

    contentContainer.innerHTML = ''; 
    console.log("Content container cleared", contentContainer.innerHTML);

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    let fileName = '';
    let stylesheetsToAdd = [];

    // Handle page loading logic
    if (page === 'home') {
        if (mainContent) {
            console.log("-----------------------");
            contentContainer.innerHTML = mainContent.innerHTML; // Show home content
            history.pushState({ page: page }, page, `#${page}`); // Update URL without reloading
        } else {
            console.error('Main content not found!');
        }
    } else if (page === 'about') {
        fileName = 'about.html';
    } else if (page === 'chat') {
        fileName = 'chat.html';  // Set the chat page filename
    } else if (page === 'vr') {
        fileName = 'vr-glasses.html';
    } else if (page === 'quiz') {
        fileName = 'quiz.html';
    } else if (page === 'login') {
        fileName = 'login.html';
        addStylesheet('login.css');  // Add login page specific styles

        // Fetch login page content dynamically
        fetch(fileName)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;

                // Add script.js dynamically after loading the login page content
                addScript('script.js', function () {
                    console.log('script.js loaded successfully');
                    switchForm('login'); // Switch to the login form by default
                    attachTabSwitchEventListeners(); // Reattach tab switching listeners
                });
            })
            .catch(error => {
                contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
                console.error('Error loading login page:', error);
            });
    } else if (page === 'logout') {
        // Perform any necessary logout operations
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('user');
        fileName = 'index.html';
    } else if (page === 'getStarted') {
        fileName = 'quiz.html';
    }

    // Apply the required stylesheets dynamically
    stylesheetsToAdd.forEach(addStylesheet);

    // Dynamically fetch content for non-home pages (including chat)
    if (page !== 'home') {
    //     fetch(fileName)
    //         .then(response => response.text())
    //         .then(data => {
    //             // Replace dynamic content with new page content
    //             contentContainer.innerHTML = data;

    //             // Trigger a reflow for the new content to be rendered
    //             contentContainer.offsetHeight; // Forces reflow/repaint for better rendering
    //         })
    //         .catch(error => {
    //             contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
    //             console.error('Error loading page content:', error);
    //         });
    // }

        fetch(fileName)
        .then(response => {
            console.log("Fetched content for:", fileName);  // Log successful fetch
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log("Page content fetched:", data);  // Log the fetched content

            contentContainer.innerHTML = data;
            console.log("Page content inserted");

            // Optionally trigger a reflow
            contentContainer.offsetHeight; // Forces reflow/repaint for better rendering

            // Initialize page-specific scripts after content insertion
            initializePageScripts(page);
        })
        .catch(error => {
            contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
            console.error('Error loading page content:', error);
        });
        // Hide home content on non-home pages
        if (page !== 'home' && homeContent) {
            homeContent.style.display = 'none';
        }

        // Show home content if navigating back to home
        if (page === 'home' && homeContent) {
            homeContent.style.display = 'block';
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

  }