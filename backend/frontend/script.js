$(document).ready(function () {
    
    $('#loginTab').click(function () {
        
        $('#loginForm').addClass('show active');
        $('#registerForm').removeClass('show active');

        
        $('#loginTab').addClass('active');
        $('#registerTab').removeClass('active');

        
        $('#formTitle').text('Login');
    });

    $('#registerTab').click(function () {
        
        $('#registerForm').addClass('show active');
        $('#loginForm').removeClass('show active');

        
        $('#registerTab').addClass('active');
        $('#loginTab').removeClass('active');

        
        $('#formTitle').text('Register');
    });

    
    $('#registerFormContent').on('submit', function (e) {
        e.preventDefault(); 

        const username = $('#username').val();
        const email = $('#emailReg').val();
        const password = $('#passwordReg').val();

        
        $.ajax({
            url: '/api/signup',
            type: 'POST',
            contentType: 'application/json',  
            data: JSON.stringify({ username, email, password }), 
            success: function (data) {
                alert('Registration successful!');
                
                $('#registerFormContent')[0].reset();
                
                $('#loginTab').click(); 
            },
            error: function (error) {
            
                alert('Registration failed: ' + error.responseJSON.error);
            }
        });
    });

    $('#loginFormContent').on('submit', function (e) {
        e.preventDefault(); 

        const email = $('#email').val();
        const password = $('#password').val();

        
        $.ajax({
            url: '/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function (data) {
                console.log('Login successful:', data); // Check if the server sends the expected data
                
                localStorage.setItem('userLoggedIn', true); 
                localStorage.setItem('user', JSON.stringify(data.user)); 
                
                console.log('Redirecting to home.html');
                window.location.href = 'home.html';
            },
            error: function (error) {
                console.error('Login failed:', error);
                alert('Login failed: ' + (error.responseJSON ? error.responseJSON.error : 'Unknown error'));
            }
        });
        
        
        
    });
});
