document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    // Get all the links in the navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    // Loop through the links to check which one matches the current page URL
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Only proceed with adding the active class if the user is logged in
        if (isLoggedIn) {
            if (window.location.pathname.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        } else {
            console.log("-------------------------------------------")
            // If the user is not logged in, avoid adding the active class for restricted links
            if (!link.getAttribute('href').includes('quiz') && 
                !link.getAttribute('href').includes('chat') && 
                !link.getAttribute('href').includes('vr')) {
                // If the link is not a restricted link, apply active class based on current URL
                if (window.location.pathname.includes(link.getAttribute('href'))) {
                    link.classList.add('active');
                }
            }
        }
    });
});
