'use strict';
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var UsersApp = (function(){
  var authToken, apiHost

  var run = function(){
    authToken = localStorage.getItem('authToken');

    apiHost = 'http://localhost:3000/'

    setupAjaxRequests();


    $('#loginForm').on('submit', submitLogin);
    $('#registrationForm').on('submit', submitRegistration);
  };



  var submitRegistration = function(event){
    event.preventDefault();

    $.ajax({
      url: apiHost + 'users',
      type: 'POST',
      data: {user: {email: $('#email').val(), password: $('#password').val()}},
    }).done(loginSuccess)
    .fail(function(data){
      trace(data);
    });

    return false;
  };

  var loginSuccess = function(userData){
    localStorage.setItem('authToken', userData.token);
    trace('logged in!');
    window.location.href = '/';
  };

  var submitLogin = function(event){
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiHost + 'users/sign_in',
      type: 'POST',
      data: $form.serialize()
    }).done(loginSuccess).fail(trace(error));
  };

  var setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = "Token token=" + authToken;
    });
  };

  var acceptFailure = function(error){
    if (error.status === 401){
      trace('send to login screen');
      window.location.href = '/sign-in.html';
    }
  };


  return {run: run,
    acceptFailure: acceptFailure
  };
})();

$(document).ready(function() {
  UsersApp.run()
});
