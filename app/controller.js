(function() {
	'use strict';
	angular.module('myApp').controller('MoviesController', ['$scope', 'MainService', MoviesController]);

	function MoviesController ($scope, MainService) {
		this.teste = "oi";
		function init () {
			var promise = MainService.loadAllMovies();
			promise.then(function (movies) {
				$scope.moviesList = movies;
				console.log(movies);
			});
		}
		init();
	}
})();