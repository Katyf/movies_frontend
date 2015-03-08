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

    // var template = Handlebars.compile($('#review-form-template').html());
    // $('.review-form').append(template({
    //   movie: data
    // }));

    $('form.new-review-form').on('submit', function(e){
      App.submitReview(e);
    });

  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.indexMovies = function(movies){
  movies.forEach(App.renderMovie);
};

App.renderMovie = function(movie, index, array) {
  $('section.main-content').append('<article class="movie" id=' + movie.title.replace(/(\s)+/g, '') + '><h1 class="movie-title">' + movie.title + '</h1>' + '<p class="movie-gross">Total Gross: $' + movie.total_gross + '</p>' + '<p class="movie-release">Release Date: ' + movie.release_date + '</p>' + '<p class="movie-gross">MPAA Rating: ' + movie.MPAA_rating + '</p>' + '<p class="movie-description">' + movie.description + '</p>' + '<h3 class="toggle-reviews" id=toggle-reviews-'+ movie.id +' >Reviews: </h3>' + '<button class="review-button" id=movie-reviews-'+ movie.id + '>Add a review</button>' +'<ul class="reviews" id="movie-reviews-'+ movie.id +'"></ul>' + '</article>');
  App.getReviews(movie);

};



App.submitMovie = function(){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: App.url + '/movies',
    type: 'POST',
    data: { movie: {
      title: $('input#movie-title').val(),
      total_gross: $('input#movie-gross').val(),
      release_date: $('input#movie-release').val(),
      MPAA_rating: $('select#movie-rating').val(),
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

  $('form.form').on('submit', function(e){
    App.submitMovie(e);
  });


});
