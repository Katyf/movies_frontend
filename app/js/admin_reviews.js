/*global $:false*/
'use strict';
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  url: 'http://localhost:3000'
};

App.adminGetReviews = function(){
  $.ajax({
    url: App.url + '/admin/reviews',
    type: 'GET'
  })
  .done(function(data) {
    debugger
    // data.forEach(App.renderReview, );
    var template = Handlebars.compile($('#review-template').html());
    $('.main-content').append(template({
      comment: data
    }));
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};


$(document).ready(function(){

  App.adminGetReviews();

});
