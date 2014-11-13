(function() {
  'use strict';
  angular.module('myApp').config(['$stateProvider', '$urlRouterProvider', routes])

  function routes ($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('home', {
    url: "/",
    templateUrl: "/views/home.view.html",
    controller: 'MoviesController'
  })


   .state('movieDetail', {
    url: "/movieDetail",
    templateUrl: "/views/movie-detail.view.html",
    controller: 'MoviesController'
  })

   .state('prices', {
    url: "/prices",
    templateUrl: "/views/prices.view.html",
    controller: 'MoviesController'
  })

   $urlRouterProvider.otherwise("/");
 }
})();