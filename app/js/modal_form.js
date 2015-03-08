'use strict';
jQuery(document).ready(function($){
  var $form_modal = $('.user-modal'),
    $form_signup = $form_modal.find('#signup'),
    $newmovie = $('.newmovie-btn');

  //open modal
  $newmovie.on('click', function(event){

    if( $(event.target).is($newmovie) ) {
      // on mobile open the submenu
      $(this).children('ul').toggleClass('is-visible');
    } else {
      // on mobile close submenu
      $newmovie.children('ul').removeClass('is-visible');
      //show modal layer
      $form_modal.addClass('is-visible');
      //show the selected form
      ( $(event.target).is('.signup') );
    }

  });

  //close modal
  $('.user-modal').on('click', function(event){
    if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
      $form_modal.removeClass('is-visible');
    }
  });

  $('.user-modal').on('click', function(event){
    if( $(event.target).is($form_modal) || $(event.target).is('#close-submit') ) {
      $form_modal.removeClass('is-visible');
    }
  });


});
