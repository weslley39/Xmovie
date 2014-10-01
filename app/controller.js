(function() {
	'use strict';
	angular.module('myApp').controller('MoviesController', ['$scope', '$http', 'MainService', MoviesController]);

	function MoviesController ($scope, $http, MainService) {
		$scope.teste = "oi";
		function init () {
			var promise = MainService.loadAllMovies();
			promise.then(function (movies) {
				$scope.movies = movies;
				console.log(movies);
			});
		}
		init();
	}
})();