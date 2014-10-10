(function() {
	'use strict';
	angular.module('myApp').controller('MoviesController', ['$scope', 'MainService', MoviesController]);

	function MoviesController ($scope, MainService) {
		var self = this;

		this.hello = function (argument) {
			alert('ooi');
		}

		self.hi = "oi";
		function init () {
			var promise = MainService.loadAllMovies();
			promise.then(function (movies) {
				console.log(movies);
				self.moviesList = movies;
			});
		}
		init();
	}
})();