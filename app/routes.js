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

    $urlRouterProvider.otherwise("/");
  }
})();