var Movie = require('../schemas/movie');

module.exports = {
	getMovies: function (cb) {
		Movie.find(function (err, movies) {
			var mapDay = {1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sabado', 7: 'Domingo'};

			var d = new Date();
			var day = d.getDay();
			var hour = d.getHours();

			movies.forEach(function(movie, index){
				var atualDay = movie['Horarios'][mapDay[day]];

				var atualHours = atualDay.split(" - ");
				var availableHours = [];
				atualHours.forEach(function(data, index2){
					if (parseInt(data.substring(0, 2)) >= hour) {
						availableHours.push(' ' + data);
					}
				});
				movies[index]['Horarios'] = '';
				if (availableHours.length === 0 ) {
					movies[index]['Horarios'] = ["Sessão Encerrada"];
				} else {
					movies[index]['Horarios'] = availableHours;
				}
			});
			cb(movies);
		});
	}
}