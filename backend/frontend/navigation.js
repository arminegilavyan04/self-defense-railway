// document.addEventListener('DOMContentLoaded', function () {
//     // Your loadPage logic here
//     function loadPage(page) {
//         const contentContainer = document.getElementById("dynamic-content");
//         const homeContent = document.getElementById("home-content");

//     // Clear dynamic content container to avoid content duplication
//     contentContainer.innerHTML = '';

//     // Remove the active class from all nav links
//     const navLinks = document.querySelectorAll('.nav-links a');
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//     });

//     let fileName = '';
//     let stylesheetsToAdd = [];

//     // Determine which page to load and ensure relevant styles are applied
//     if (page === 'home') {
//         fileName = 'index.html'; // Home content

//         // Ensure home page styles are applied
//         if (!document.querySelector('link[href="canv.css"]')) {
//             stylesheetsToAdd.push('canv.css'); // If home.css isn't in the head, add it
//         }

//         // Show home content (don't clear content container)
//         homeContent.style.display = 'block';
//         contentContainer.innerHTML = ''; // Clear only the dynamic content area
//     } else if (page === 'about') {
//         fileName = 'about.html';
//     } else if (page === 'vr') {
//         fileName = 'vr-glasses.html';
//     } else if (page === 'chat') {
//         fileName = 'chat.html';
//     } else if (page === 'quiz') {
//         fileName = 'quiz.html';
//     } else if (page === 'login') {
//         fileName = 'login.html';
//         addStylesheet('login.css');
//     } else if (page === 'getStarted') {
//         fileName = 'login.html';
//         addStylesheet('login.css');
//     }

//     // Apply the required stylesheets dynamically
//     stylesheetsToAdd.forEach(addStylesheet);

//     // Dynamically fetch content for non-home pages
//     if (page !== 'home') {
//         fetch(fileName)
//             .then(response => response.text())
//             .then(data => {
//                 contentContainer.innerHTML = data;

//                 // After content is loaded, reattach event listeners for login/register tabs and form switching
//                 if (page === 'login' || page === 'getStarted') {
//                     switchForm('login'); // Switch to the login form by default
//                     attachTabSwitchEventListeners(); // Reattach tab switching listeners
//                 }
//             })
//             .catch(error => {
//                 contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
//                 console.error('Error loading page content:', error);
//             });
//     }

//     // Hide home content on non-home pages
//     if (page !== 'home') {
//         homeContent.style.display = 'none';
//     }

//     // Add the active class to the clicked navigation link
//     navLinks.forEach(link => {
//         if (link.textContent.trim().toLowerCase() === page) {
//             link.classList.add('active');
//         }
//     });

//     // Optionally, update the browser's history (so the URL changes without page reload)
//     history.pushState({ page: page }, page, `#${page}`);
// }

// // Function to add the stylesheet dynamically
// function addStylesheet(href) {
//     const existingLink = document.querySelector(`link[href="${href}"]`);
//     if (existingLink) {
//         return;  // Don't add the stylesheet if it's already in the DOM
//     }

//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = href;
//     link.onload = () => {
//         console.log(`${href} loaded successfully.`);
//     };
//     link.onerror = () => {
//         console.error(`Error loading ${href}`);
//     };
//     document.head.appendChild(link);
// }

// // Function to attach event listeners for switching between login and register forms
// function attachTabSwitchEventListeners() {
//     const loginTab = document.getElementById('loginTab');
//     const registerTab = document.getElementById('registerTab');

//     if (loginTab) {
//         loginTab.addEventListener('click', () => switchForm('login'));
//     }

//     if (registerTab) {
//         registerTab.addEventListener('click', () => switchForm('register'));
//     }
// }

// // Function to switch between Login and Register forms
// function switchForm(form) {
//     // Ensure the login and register forms are visible
//     const loginForm = document.getElementById('loginForm');
//     const registerForm = document.getElementById('registerForm');
//     const loginTab = document.getElementById('loginTab');
//     const registerTab = document.getElementById('registerTab');

//     if (loginForm && registerForm && loginTab && registerTab) {
//         loginForm.style.display = 'none';
//         registerForm.style.display = 'none';

//         // Show the selected form
//         if (form === 'login') {
//             loginForm.style.display = 'block';
//             loginTab.classList.add('active');
//             registerTab.classList.remove('active');
//         } else if (form === 'register') {
//             registerForm.style.display = 'block';
//             registerTab.classList.add('active');
//             loginTab.classList.remove('active');
//         }
//     }
// }
// });
document.addEventListener('DOMContentLoaded', function () {
    // Load dynamic content into the page based on navigation
    function loadPage(page) {
        // Get references to dynamic content and navbar placeholders
        const contentContainer = document.getElementById("dynamic-content");
        const navbarPlaceholder = document.getElementById("navbar-placeholder");
        const homeContent = document.getElementById("home-content");

        // Check if the content container and navbar are available
        if (!contentContainer || !navbarPlaceholder) {
            console.error("Required DOM elements are missing: dynamic-content or navbar-placeholder");
            return; // Exit if critical elements are missing
        }

        // Clear the dynamic content to prevent duplication
        contentContainer.innerHTML = '';

        // Remove 'active' class from all nav links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Set file name and additional stylesheets based on the page
        let fileName = '';
        let stylesheetsToAdd = [];

        if (page === 'home') {
            fileName = 'index.html'; // Home content
            if (!document.querySelector('link[href="canv.css"]')) {
                stylesheetsToAdd.push('canv.css'); // Add home CSS if not already included
            }
            homeContent.style.display = 'block'; // Show home content
        } else if (page === 'about') {
            fileName = 'about.html';
        } else if (page === 'vr') {
            fileName = 'vr-glasses.html';
        } else if (page === 'chat') {
            fileName = 'chat.html';
        } else if (page === 'quiz') {
            fileName = 'quiz.html';
        } else if (page === 'login' || page === 'getStarted') {
            fileName = 'login.html';
            stylesheetsToAdd.push('login.css');
        }

        // Add required stylesheets dynamically
        stylesheetsToAdd.forEach(addStylesheet);

        // Dynamically load content for non-home pages
        if (page !== 'home') {
            fetch(fileName)
                .then(response => response.text())
                .then(data => {
                    contentContainer.innerHTML = data; // Inject the content into dynamic-container

                    // Reattach event listeners for dynamic content (e.g., login form)
                    if (page === 'login' || page === 'getStarted') {
                        switchForm('login'); // Switch to the login form by default
                        attachTabSwitchEventListeners(); // Reattach form tab switching event listeners
                    }
                })
                .catch(error => {
                    contentContainer.innerHTML = "<p>Sorry, we couldn't load the requested page.</p>";
                    console.error('Error loading page content:', error);
                });
        }

        // Hide home content if not on home page
        if (page !== 'home') {
            homeContent.style.display = 'none';
        }

        // Add the active class to the clicked navigation link
        navLinks.forEach(link => {
            if (link.textContent.trim().toLowerCase() === page) {
                link.classList.add('active');
            }
        });

        // Optionally, update the browser's history so the URL changes without reloading the page
        history.pushState({ page: page }, page, `#${page}`);
    }

    // Function to dynamically add stylesheets to the document
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

    // Function to attach event listeners for switching between login and register forms
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

        if (loginForm && registerForm && loginTab && registerTab) {
            loginForm.style.display = 'none';
            registerForm.style.display = 'none';

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

    // You can now call loadPage() for different sections like:
    // loadPage('home');
    // loadPage('chat');
    // loadPage('quiz');
    // etc.
});
