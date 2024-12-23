document.addEventListener('DOMContentLoaded', function() {
    
    const isLoggedIn = sessionStorage.getItem('userLoggedIn') === 'true';
    
    
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    
    navLinks.forEach(link => {
       
        link.classList.remove('active');
        
       
        if (isLoggedIn) {
            if (window.location.pathname.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        } else {

            if (!link.getAttribute('href').includes('quiz') && 
                !link.getAttribute('href').includes('chat') && 
                !link.getAttribute('href').includes('vr')) {
                
                if (window.location.pathname.includes(link.getAttribute('href'))) {
                    link.classList.add('active');
                }
            }
        }
    });
});
