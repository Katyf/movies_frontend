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


App.getReviews = function(movie){
  $.ajax({
    url: App.url + '/movies/' + movie.id + '/reviews',
    type: 'GET'
  })
  .done(function(data) {
    data.forEach(App.renderReview, movie);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.renderReview = function(review, index, array) {
  // trace(review, index);
  $('#'+ this.title.replace(/(\s)+/g, '') +' .reviews').append('<li class="review">' + '<p class="review-body">' + review.body + '</p>' + '<p class="review-rating">' + review.rating + '</p>' + '<p class="review-author">' + review.author + '</p>' +'</li>');

};

App.submitReview = function(event){
  event.preventDefault();
  var id = parseInt(event.target.id.replace(/\D/g, ''))
  var $author = $('#movie-review-form-'+ id +' #review-author');
  var $body = $('#movie-review-form-'+ id +' #review-body');
  var $rating = $('#movie-review-form-'+ id + ' [type="radio"]:checked');


  $.ajax({
    url: App.url + '/movies/' + id + '/reviews',
    type: 'POST',
    data: { review: {
      author: $author.val(),
      body: $body.val(),
      rating: $rating.val()
      }
    },
  })
  .done(function(data) {
    trace(data);
    var template = Handlebars.compile($('#review-template').html());
    $('#movie-reviews-' + id).append(template(data));
    $author.val('');
    $body.val('');
    $rating.prop('checked', false);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.deleteReview = function(review){
  $.ajax({
    url: App.url + '/admin/reviews' + review.id,
    type: 'DELETE'
  })
  .done(function(data) {
    trace(data, 'comment deleted!');

  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};
