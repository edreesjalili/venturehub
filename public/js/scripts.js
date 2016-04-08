$(document).ready(function() {
    //------ about annd social media button controls
    $('#about-us-button').sidr({
      name: 'about-us',
      body: 'main',
      side: 'left'
    });
    $('#social-media-button').sidr({
      name: 'sm-wrap',
      body: 'main',
      side: 'right'
    });
    $('#close-about-us').on('click', function() {
        $.sidr('close', 'about-us');
    });
    $('#close-sm-wrap').on('click', function() {
        $.sidr('close', 'sm-wrap');
    });
    //-------- end about and social media controls

    //-------- video controls
    var vid = document.getElementById("bgvid"),
    pauseButton = document.getElementById("vidpause");
    function vidFade() {
        vid.classList.add("stopfade");
    }
    vid.addEventListener('ended', function() {
        vid.pause();
        vidFade();
    });
    pauseButton.addEventListener("click", function() {
        vid.classList.toggle("stopfade");
        if (vid.paused) {
    vid.play();
            pauseButton.innerHTML = "Pause";
        } else {
            vid.pause();
            pauseButton.innerHTML = "Paused";
        }
    })
    //------------ end video controls

    //---------- sign up/login button controls
    var suBusinessButton = $('#su-business-button');
    var suInvestorButton = $('#su-investor-button');
    var suBusiness = $('#su-business');
    var suInvestor = $('#su-investor');
    var loginSubmit = $('#submit-login');
    var loginInputs = $('#login-inputs');
    var defaultNav = $('#default-nav');

    $('#back-login').on('click', function() {
        defaultNav.removeClass('hide');
        loginInputs.addClass('hide');
    });

    $('#login').on('click', function() {
        defaultNav.addClass('hide');
        loginInputs.removeClass('hide');
    });

    suBusinessButton.on('click', function() {
        suClicked(suInvestor, suBusiness);
    });

    suInvestorButton.on('click', function() {
        suClicked(suBusiness, suInvestor);
    });

    var suClicked = function suClicked(hidden, shown) {
        shown.is(':visible') ? shown.slideUp(1000) : hidden.is(':visible') ? hidden.slideUp(500, function(){shown.slideDown(500);}) : shown.slideDown(1000);
    }

    $('#submit-login').on('click', function() {
        alert('Login is not available at this time!');
    });

    var bosuForm = $('#bo-signup-form').validate({
      rules: {
        'bo-company-name': 'required',
        'bo-email': {
          'email': true,
          'required': true
        },
        'bo-password': {
          'required': true,
          'minlength': 6
        },
        'bo-confirm-password': {
          'required': true,
          'minlength': 6,
          'equalTo': '#bo-password'
        }
      },
      messages: {
        'bo-company-name': "Please enter your company name.",
        'bo-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters."
        },
        'bo-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters.",
          'equalTo': "Password does not match the one above."
        }
      }
    });

    $('#in-signup-form').validate({
      rules: {
        'in-company-name': "required",
        'in-email': {
          'email': true,
          'required': true
        },
        'in-password': {
          'required': true,
          'minlength': 6
        },
        'in-confirm-password': {
          'required': true,
          'minlength': 6,
          'equalTo': '#in-password'
        }
      },
      messages: {
        'in-company-name': "Please enter your company name.",
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters."
        },
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters.",
          'equalTo': "Password does not match the one above."
        }
      }
    });

    $('#bo-signup-form').submit(function(e) {
      e.preventDefault();
      var data = {};
      data.password = $('#bo-password').val();
      data.email = $('#bo-email').val();
      data.company = $('#bo-company-name').val();
      data.type = "Business Owner";
      $.post('/signup', data, function(response, status) {
        if(status) {
          alert('Sign Up Successful');
        } else {
          alert('Sign Up Failed');
          console.log(response);
        }
        e.target.reset();
        bosuForm.resetForm();
      });
    });

    var insuForm = $('#in-signup-form').validate({
      rules: {
        'in-company-name': 'required',
        'in-email': {
          'email': true,
          'required': true
        },
        'in-password': {
          'required': true,
          'minlength': 6
        },
        'in-confirm-password': {
          'required': true,
          'minlength': 6,
          'equalTo': '#in-password'
        }
      },
      messages: {
        'in-company-name': "Please enter your company name.",
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters."
        },
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters.",
          'equalTo': "Password does not match the one above."
        }
      }
    });

    $('#in-signup-form').validate({
      rules: {
        'in-company-name': "required",
        'in-email': {
          'email': true,
          'required': true
        },
        'in-password': {
          'required': true,
          'minlength': 6
        },
        'in-confirm-password': {
          'required': true,
          'minlength': 6,
          'equalTo': '#in-password'
        }
      },
      messages: {
        'in-company-name': "Please enter your company name.",
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters."
        },
        'in-password': {
          'required': "Please enter a password with atleast 6 characters.",
          'minlength': "Please enter a password with atleast 6 characters.",
          'equalTo': "Password does not match the one above."
        }
      }
    });

    $('#in-signup-form').submit(function(e) {
      e.preventDefault();
      var data = {};
      data.password = $('#in-password').val();
      data.email = $('#in-email').val();
      data.company = $('#in-company-name').val();
      data.type = "Investor";
      $.post('/signup', data, function(response, status) {
        if(status) {
          alert('Sign Up Successful');
        } else {
          alert('Sign Up Failed');
          console.log(response);
        }
        e.target.reset();
        insuForm.resetForm();
      });
    });
});
