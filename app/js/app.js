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

App.renderMovie = function(currentVal, index, array) {
  trace(currentVal, index);
  $('section.main-content').append('<article class="movie">' + '<h1 class="movie-title">' + currentVal.title + '</h1>' + '<p class="movie-gross">Total Gross: $' + currentVal.total_gross + '</p>' + '<p class="movie-release">Release Date: ' + currentVal.release_date + '</p>' + '<p class="movie-gross">MPAA Rating: ' + currentVal.MPAA_rating + '</p>' + '<p class="movie-description">' + currentVal.description + '</p>' + '</article>');
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


$(document).ready(function(){

  App.getMovies();

  $('form.new-movie-form').on('submit', function(e){
    App.submitMovie(e);
  });

  // $('.testbutton').on('click', function() {
  //   $('.ui.modal').modal('show');
  // });


  // $('.popup').on('click', function(){
  //    $('.modal').modal('show');
  // });

});
