(function() {
	'use strict';
	angular.module('myApp').service('MainService', ['$http', '$q', MainService]);

	function MainService ($http, $q) {
		return({
			loadAllMovies: loadAllMovies,
			loadPrices : loadPrices
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

		function loadPrices () {
			var request = $http({
				method: 'GET',
				url: 'getPrices',
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