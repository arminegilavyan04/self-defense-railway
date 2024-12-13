document.addEventListener('DOMContentLoaded', function() {
    // Get all the links in the navigation
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    // Loop through the links to check which one matches the current page URL
    navLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to the link that matches the current URL
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});