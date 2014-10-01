(function() {
	'use strict';
	angular.module('myApp').service('MainService', ['$http', '$q', MainService]);

	function MainService ($http, $q) {
		return({
			loadAllMovies: loadAllMovies
		});

		function loadAllMovies() {
			var request = $http({
				method: 'GET',
				url: 'loadData',
				params: {},
				data: {}
			});
			return (request.then(handleSuccess, handleError));
		}

		function handleError( response ) {
			return( response.data );
		}

		function handleSuccess( response ) {
			return( response.data );
		}
	}


})();