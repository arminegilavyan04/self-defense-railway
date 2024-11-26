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
    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
        console.log(`${src} is already loaded.`);
        return;  // Don't add the script if it's already in the DOM
    }

    // If the script being added is script.js, ensure jQuery is loaded first
    if (src === 'script.js' && !window.jQuery) {
        console.log("jQuery is not loaded, loading jQuery first...");
        
        // If jQuery is not loaded, load it first
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        
        // Log when jQuery is loaded
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
    script.onload = function() {
        console.log(`${src} loaded successfully.`);
        if (callback) callback();  // Call the callback when the script is loaded
    };
    script.onerror = function() {
        console.error(`Error loading ${src}`);
    };
    document.body.appendChild(script);
}

// Function to dynamically load content from external HTML files
function loadPage(page) {
    const contentDiv = document.getElementById('dynamic-content');
    const url = `${page}.html`;  // Assuming your page files are named like 'home.html', 'about.html', etc.
  
    fetch(url) // Fetch the HTML content for the specific page
      .then(response => {
        if (response.ok) {
          return response.text(); // If the response is OK, return the text (HTML content)
        } else {
          throw new Error('Page not found'); // Handle errors (e.g., if the file doesn't exist)
        }
      })
      .then(data => {
        contentDiv.innerHTML = data; // Inject the fetched content into the dynamic content div
      })
      .catch(error => {
        contentDiv.innerHTML = `<h1>${error.message}</h1>`; // Display error message if something goes wrong
      });
  }
  
  // Dropdown toggle for the person icon
  function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('show');
  }
  
  // Close dropdown if clicked outside of the person icon
  window.onclick = function(event) {
    const dropdown = document.getElementById('dropdown-menu');
    const personIcon = document.querySelector('.person-icon');
    if (!personIcon.contains(event.target)) {
      dropdown.classList.remove('show');
    }
  };
  


// Function to attach event listeners for switching between Login and Register forms
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
