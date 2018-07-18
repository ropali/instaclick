
const loginBtn = document.getElementById('login');

const signupBtn = document.getElementById('signup');

const login = document.getElementById('submit-login');

const signup = document.getElementById('submit-signup');


// Add click listner to login button

loginBtn.addEventListener('click', (e) => {
    $('.button-menu').slideUp('slow', function(){
       $('#login-form').slideDown('slow');
   }); 
    
});


// Add click listner to signup button
signupBtn.addEventListener('click', (e) => {
    $('.button-menu').slideUp('slow', function () {
        //$('.jumbotron').css('display', 'block');
        $('#signup-form').slideDown('slow');

    }); 
});



/*
    if there are validation errors
    then do not show the buttons 
    and directly show the form
*/

login.addEventListener('click', (e) => {
    e.preventDefault();
    let email = $('#login-email').val();
    let pass = $('#login-password').val();
    
    
    if(email != '' && pass != ''){
        login.innerText = 'Checking...'
        $.ajax({
            url: '/users/login',
            type: 'POST',
            data: {
                email: email,
                password: pass
            },
            success: function(response){
                console.log(response);
                window.location = "/";
            },
            error: function(err){
                console.log(err.msg);
                login.innerText = 'Login';
                $('#login-error').slideDown('slow').first('p').text('Username or password wrong!    ');
            }
        });
    }
});

signup.addEventListener('click', (e) => {
    e.preventDefault();
    let name = $('#full_name').val();
    let email = $('#inputEmail').val();
    let pass = $('#inputPassword').val();
    let pass1 = $('#inputPassword2').val();
    let gender = $('input[name=gender]:checked').val();
    
    if (email != '' && pass != '' && name != '' && pass1 != '') {
        if(pass != pass1){
            alert('Passwords did not match!');
        }

        signup.innerText = 'Signing...';
        $.ajax({
            url: '/users/signup',
            type: 'POST',
            data: {
                fullname: name,
                email: email,
                password: pass,
                gender: gender
            },
            success: function (response) {
                console.log('success');
                window.location = "/";
            },
            error: function (err) {
                signup.innerText = 'Sign up';
                $('#signup-error').slideDown('slow').first('p').text('Signup failed!Try again.');
            }
        });
    }
});