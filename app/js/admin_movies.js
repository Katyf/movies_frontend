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

App.adminGetMovies = function(){
  $.ajax({
    url: App.url + '/movies',
    type: 'GET',
  })
  .done(function(data) {
    App.adminIndexMovies(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.adminIndexMovies = function(movies){
  movies.forEach(App.adminRenderMovie);
};

App.adminRenderMovie = function(movie, index, array) {
  $('section.main-content').append('<article class="movie" id=' + movie.title.replace(/(\s)+/g, '') + '><h1 class="movie-title" id=movie-title-' + movie.id + '>' + movie.title + '</h1>' + '<input type="button" class="delete-movie" id=delete' + movie.id + ' value="Delete Movie">' + '</article>');

  $('.delete-movie').on('click', function(event){
      var id = parseInt(event.target.id.replace(/\D/g, ''));
      App.deleteMovie(id)
  });
};


App.deleteMovie = function(movie){
  $.ajax({
    url: App.url + '/admin/movies/' + movie,
    type: 'DELETE',
  })
  .done(function(data) {
    trace(data, 'movie has been deleted!');
    $('#movie-'+ movie).remove();
    location.reload();
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

$(document).ready(function(){

  App.adminGetMovies();

});
