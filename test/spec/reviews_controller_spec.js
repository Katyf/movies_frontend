'use strict';

describe('Movies App- Reviews', function() {
  it('should pass', function() {
    expect(true).toBe(true);
  });
  it('should be defined', function(){
    expect(App).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.getReviews).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.deleteReview).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.renderReview).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.submitReview).toBeDefined();
  });
});

