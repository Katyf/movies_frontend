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

App.getMovies = function(){
  $.ajax({
    url: App.url + '/movies',
    type: 'GET',

  })
  .done(function(data) {
    App.indexMovies(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.indexMovies = function(movies){
  movies.forEach(App.renderMovie);
};

App.renderMovie = function(movie, index, array) {
  trace(movie, index);
  $('section.main-content').append('<article class="movie" id=' + movie.title.replace(/(\s)+/g, '') + '><h1 class="movie-title">' + movie.title + '</h1>' + '<p class="movie-gross">Total Gross: $' + movie.total_gross + '</p>' + '<p class="movie-release">Release Date: ' + movie.release_date + '</p>' + '<p class="movie-gross">MPAA Rating: ' + movie.MPAA_rating + '</p>' + '<p class="movie-description">' + movie.description + '</p>' +'<ul class="reviews"></ul>' + '</article>');
  App.getReviews(movie);
};

// App.renderNewReview = function(movie) {
//       '<section class="review-form"><header><h1>Add A Review</h1></header><form class="new-review-form"><div class="form-group"><label for="review-author">Review Author</label><br><input type="text" id="review-author" class="clearme" /></div><div class="form-group">        <label for="review-body">Review</label><br>        <textarea id="review-body" class="clearme"></textarea>    </div>    <div class="form-group">        <label for="review-rating">Rating</label><br>        1<input type="radio" name="rating" value="1">        2<input type="radio" name="rating" value="2">        3<input type="radio" name="rating" value="3">        4<input type="radio" name="rating" value="4">        5<input type="radio" name="rating" value="5">    </div>    <div class="form-group">        <input type="submit" value="create review" class="btn" />    </div></form>'
// }

App.submitMovie = function(){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: App.url + '/movies',
    type: 'POST',
    data: { movie: {
      title: $('input#movie-title').val(),
      total_gross: $('input#movie-gross').val(),
      release_date: $('input#movie-release').val(),
      MPAA_rating: $('input#movie-rating').val(),
      description: $('textarea#movie-description').val(),
      }
    },
  })
  .done(function(data) {
    console.log("success");
    trace(data);
    $('.clearme').val('');
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });

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






// App.editMovie = function(movie) {
//   var movieId = parseInt(movie);
//   var $newTitle, $newBody;
//   var $title = $('#'+ movie + '.movie h3').text();
//   var $body = $('#'+ movie + '.movie :not(h3)').text();
//   var $movie = $('#'+ movie + '.movie');
//   var originalHTML = $movie.html();

//   $movie.html('<div class="movie-form"><form id="edit-movie-form"><div class="form-group"><input name="movie-title" type="text" value="'+ $title +'" id=' + movieId + ' class="clear-me" /></div><div class="form-group"><label for="movie-body">movie Body</label><textarea name="movie-body"  id="movie-body"></textarea></div><div class="form-group"><input type="button" id="save" value="Save movie" /><input type="button" id="cancel" value="Cancel" /></div></form></div>');
//   $('.movie#' + movie + ' [name=movie-body]').val($body);

//   var $saveButton = $('#edit-†save');
//       $saveButton.on('click', function(){
//         $newTitle = $('[name=edit-movie-title]').val();
//         $newBody = $('[name=edit-movie-body]').val();
//         $.ajax({
//           url: App.url + '/movies/' + movieId,
//           type: 'PATCH',
//           data: {
//             movie: {
//               title: $newTitle,
//               body: $newBody,
//             },
//           },
//         }).done(function(data){
//           trace(data);

//           $movie.html('<h3>' + $newTitle + '</h3>' + '<p>' + $newBody + '</p>' + '<input type=button class=edit id=' + movieId + ' value="Edit movie" >' + '<input type=button class=delete id=' + movieId + ' value="Delete movie" >');

//           App.setMovieButtonHandlers();
//         })
//         .fail(function(jqXHR, textStatus, errorThrown){
//           trace(jqXHR, textStatus, errorThrown);
//         });
//       });
// };

$(document).ready(function(){

  App.getMovies();

  $('form.new-movie-form').on('submit', function(e){
    App.submitMovie(e);
  });

});
