$(document).ready(function () {
    // Switch between Sign Up and Login
    $('#nav-signup').click(function () {
        $('#signup').addClass('show active');
        $('#login').removeClass('show active');
    });

    $('#nav-login').click(function () {
        $('#login').addClass('show active');
        $('#signup').removeClass('show active');
    });

    // Handle Sign Up form submission
    $('#signup-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#signup-username').val();
        const password = $('#signup-password').val();

        // Make an API request to your backend for sign up
        $.post('/api/signup', { username, password }, function (data) {
            // Handle success or error responses
            alert('Sign Up successful!');
            // Optionally redirect or clear form
        }).fail(function (error) {
            alert('Sign Up failed: ' + error.responseJSON.message);
        });
    });

    // Handle Login form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#login-username').val();
        const password = $('#login-password').val();

        // Make an API request to your backend for login
        $.post('/api/login', { username, password }, function (data) {
            // Handle success or error responses
            alert('Login successful!');
            // Optionally redirect or clear form
        }).fail(function (error) {
            alert('Login failed: ' + error.responseJSON.message);
        });
    });
});
