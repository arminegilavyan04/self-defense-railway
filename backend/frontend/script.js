$(document).ready(function () {
    // Switch between Login and Registration forms using tabs
    $('#loginTab').click(function () {
        $('#loginForm').addClass('show active');
        $('#registerForm').removeClass('show active');
        $('#formTitle').text('Login'); // Update the form title to 'Login'
    });

    $('#registerTab').click(function () {
        $('#registerForm').addClass('show active');
        $('#loginForm').removeClass('show active');
        $('#formTitle').text('Register'); // Update the form title to 'Register'
    });

    // Handle Registration form submission
    $('#registerFormContent').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const username = $('#username').val();
        const email = $('#emailReg').val();
        const password = $('#passwordReg').val();

        // Make an API request to your backend for registration
        $.post('/api/signup', { username, email, password }, function (data) {
            // Handle success or error responses
            alert('Registration successful!');
            // Optionally redirect or clear form
        }).fail(function (error) {
            alert('Registration failed: ' + error.responseJSON.message);
        });
    });

    // Handle Login form submission
    $('#loginFormContent').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const email = $('#email').val();
        const password = $('#password').val();

        // Make an API request to your backend for login
        $.post('/api/login', { email, password }, function (data) {
            // Handle success or error responses
            alert('Login successful!');
            // Optionally redirect or clear form
        }).fail(function (error) {
            alert('Login failed: ' + error.responseJSON.message);
        });
    });
});
