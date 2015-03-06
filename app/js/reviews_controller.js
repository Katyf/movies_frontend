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
  trace(review, index);
  $('#'+ this.title.replace(/(\s)+/g, '') +' .reviews').append('<li class="review">' + '<p class="review-body">' + review.body + '</p>' + '<p class="review-rating">' + review.rating + '</p>' + '<p class="review-author">' + review.author + '</p>' +'</li>');
};

App.submitReview = function(){
  $.ajax({
    url: App.url + '/movies/' + movie.id + '/reviews',
    type: 'get',
    data: { review: {
      author: $('insert author box here').val(),
      body: $('insert body box here').val(),
      rating: $('insert rating such here').val()
      }
    },

  })
  .done(function(data) {
    trace(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

// App.deleteReview = function(review){
//   $.ajax({
//     url: App.url + '/admin/reviews' + review.id,
//     type: 'DELETE'
//   })
//   .done(function(data) {
//     trace(data);
//   })
//   .fail(function(jqXHR, textStatus, errorThrown) {
//     trace(jqXHR, textStatus, errorThrown);
//   });
// };

// App.renderNewReview = function(movie) {
//       '<section class="review-form"><header><h1>Add A Review</h1></header><form class="new-review-form"><div class="form-group"><label for="review-author">Review Author</label><br><input type="text" id="review-author" class="clearme" /></div><div class="form-group">        <label for="review-body">Review</label><br>        <textarea id="review-body" class="clearme"></textarea>    </div>    <div class="form-group">        <label for="review-rating">Rating</label><br>        1<input type="radio" name="rating" value="1">        2<input type="radio" name="rating" value="2">        3<input type="radio" name="rating" value="3">        4<input type="radio" name="rating" value="4">        5<input type="radio" name="rating" value="5">    </div>    <div class="form-group">        <input type="submit" value="create review" class="btn" />    </div></form>'
// }

