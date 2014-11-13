(function() {
	'use strict';
	var crawler = require('../components/crawler');
	var Movie = require('../schemas/movie');
	var movieService = require('../services/movie.service.js');
	var updateService = require('../services/update.service.js');

	module.exports = {
		getMovies: getMovies
	};

	function getMovies (cb) {
		updateMovies(function() {
			Movie.find(function (err, movies) {
				var mapDay = {1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sabado', 0: 'Domingo'};

				var d = new Date();
				var day = d.getDay();
				var hour = d.getHours();

				movies.forEach(function(movie, index){
					var atualDay = movie.Horarios[mapDay[day]];

					var atualHours = atualDay.split(" - ");
					var availableHours = [];
					atualHours.forEach(function(data, index2){
						if (parseInt(data.substring(0, 2)) >= hour) {
							availableHours.push(' ' + data);
						}
					});
					movies[index].Horarios = '';
					if (availableHours.length === 0 ) {
						movies[index].Horarios = ["Sessão Encerrada"];
					} else {
						movies[index].Horarios = availableHours;
					}
				});
				cb(movies);
			});
		});
	}

	function updateMovies (cb) {
		updateService.needUpdate(function(need) {
			if(!need) return cb();
			if (need) {
				Movie.remove({}, function(err) { 
					if (err) throw err;
					crawler.updateListMovies(function(movies) {
						Movie.create(movies, function (err, movies) {
							if (err) throw err;
							cb();
						});
					});
				});
			}
		});
	}
})();