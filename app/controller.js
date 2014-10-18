(function() {
	'use strict';
	angular.module('myApp').controller('MoviesController', ['$scope', '$rootScope', 'MainService', MoviesController]);

	function MoviesController ($scope, $rootScope, MainService) {
		// $scope.movieDetail = {"Titulo":"Os Boxtrolls (Dub) (3D)","Url":"cinema_lazer.php?id_filme=78","Descricao":"Ovo (Isaac Hempstead-Wright) é um garoto órfão, que desde bebê foi criado nos esgotos da cidade de Ponte Queijo pelos boxtrolls, amáveis criaturas que vivem do lixo deixado por humanos. Como os boxtrolls são caçados impiedosamente por Archibald Snatcher (Ben Kingsley) e sua gangue, eles apenas deixam o subterrâneo à noite e, ainda assim, de vez em quando um deles é capturado. \r\n\r\nQuando Peixe, o boxtrolls que criou Eggs, é pego, o garoto decide se aventurar pela cidade para resgatá-lo. É quando conhece Winnie (Elle Fanning), uma garota mimada que faz com que perceba que ele é, na verdade, um humano.","Img":"http://www.shoppingpatioguarulhos.com.br/banco_imagens/filmes/filme_78.jpg","DataInicial":"02/10/2014","DataFinal":"17/10/2014","Genero":"Aventura , Família , Animação , Fantasia","Censura":"Livre","Elenco":"Isaac Hempstead-Wright, Elle Fanning, Ben Kingsley","Diretor":"Graham Annable, Anthony Stacchi","_id":"543888c63e447a470c616d31","__v":0,"Horarios":"","$$hashKey":"00H"};
		
		function init () {
			var promise = MainService.loadAllMovies();
			promise.then(function (movies) {
				$scope.moviesList = movies;
			});
		}


		$scope.showMovieDetail = function (movieIndex) {
			$rootScope.movieDetail = $scope.moviesList[movieIndex];
			// console.log(JSON.stringify($rootScope.movieDetail));
		}
		init();
	}
})();