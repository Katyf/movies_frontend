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
    var template = Handlebars.compile($('#review-template').html());
    $('.main-content').append(template({
      comment: data
    }));

    $('.delete-review').on('click', function(event){
      var id = parseInt(event.target.id.replace(/\D/g, ''));
      App.deleteReview(id)
    });

    $('.edit-review').on('click', function(event){
      var id = parseInt(event.target.id.replace(/\D/g, ''));
      App.editReview(id);
    });



  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};


App.deleteReview = function(review){


  $.ajax({
    url: App.url + '/admin/reviews/' + review,
    type: 'DELETE',
  })
  .done(function(data) {
    trace(data, 'comment deleted!');
    $('#review-'+ review).remove();

  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};


App.editReview = function(id){
  var $review = $('#review-' + id);
  var originalHTML = $review.html();
  var author = $('#review-' + id + ' .review-author').val();
  var body = $('#review-' + id + ' .review-body').val();
  var rating = $('#review-' + id + ' .review-rating').val();


  var template = Handlebars.compile($('#review-form-template').html());
  $review.append(template);

  $('#review-author').val(author);

};


App.submitReview = function(id){

  $.ajax({
    url: App.url + '/admin/reviews/' + id,
    type: 'PUT',
    data: {
      review: {
      author: $authorP.val(),
      body: $bodyP.val(),
      rating: $ratingP.val()
      }
    },

  })
  .done(function(data) {
    trace(data, 'comment edited!');


  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

$(document).ready(function(){

  App.adminGetReviews();

});
