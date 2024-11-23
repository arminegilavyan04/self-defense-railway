$(document).ready(function () {
    console.log('script.js is loaded');
    // Switch between Login and Registration forms using tabs
    $('#loginTab').click(function () {
        // Show the Login Form and hide the Register Form
        $('#loginForm').addClass('show active');
        $('#registerForm').removeClass('show active');

        // Activate the Login Tab and deactivate the Register Tab
        $('#loginTab').addClass('active');
        $('#registerTab').removeClass('active');

        // Update the form title to 'Login'
        $('#formTitle').text('Login');
    });

    $('#registerTab').click(function () {
        // Show the Register Form and hide the Login Form
        $('#registerForm').addClass('show active');
        $('#loginForm').removeClass('show active');

        // Activate the Register Tab and deactivate the Login Tab
        $('#registerTab').addClass('active');
        $('#loginTab').removeClass('active');

        // Update the form title to 'Register'
        $('#formTitle').text('Register');
    });

    // Handle Registration form submission
    $('#registerFormContent').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#username').val();
        const email = $('#emailReg').val();
        const password = $('#passwordReg').val();

        // Make an API request to your backend for registration
        $.ajax({
            url: '/api/signup',
            type: 'POST',
            contentType: 'application/json',  // Set content type to JSON
            data: JSON.stringify({ username, email, password }), // Send data as JSON
            success: function (data) {
                alert('Registration successful!');
                // Optionally clear form or redirect to login
                $('#registerFormContent')[0].reset();
                // Switch back to login tab after registration
                $('#loginTab').click(); 
            },
            error: function (error) {
                // Handle error response
                alert('Registration failed: ' + error.responseJSON.error);
            }
        });
    });

    // Handle Login form submission
    $('#loginFormContent').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission
        console.log('Login form submitted'); 

        const email = $('#email').val();
        const password = $('#password').val();

        // Make an API request to your backend for login
        $.ajax({
            url: '/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function (data) {
                // Log successful login
                console.log('Login successful:', data);
        
                // Store login state and user data in localStorage
                localStorage.setItem('userLoggedIn', true); // Mark user as logged in
                localStorage.setItem('user', JSON.stringify(data.user)); // Save user data (without password)
        
                // Redirect to home.html
                console.log('Redirecting to home.html');
                window.location.href = 'home.html';
            },
            error: function (error) {
                // Log the error for debugging
                console.error('Login failed:', error);
                alert('Login failed: ' + (error.responseJSON ? error.responseJSON.error : 'Unknown error'));
            }
        });
        
        
    });
});
