var crawler = require('../components/crawler');
var Movie = require('../schemas/movie');
var LastUpdate = require('../schemas/lastUpdate');


module.exports = exports = function(app, db){
    app.get('/', function(req, res, next){
        "use strict";

        Movie.find(function (err, movies) {

                var mapDay = {1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sabado', 7: 'Domingo'};

                var d = new Date();
                var day = d.getDay();
                var hour = d.getHours();

                movies.forEach(function(movie, index){
                    var atualDay = movie['Horarios'][mapDay[day]];
                    
                    var atualHours = atualDay.split(" - ");
                    console.log(atualHours)
                    atualHours.forEach(function(data, index){
                        if (parseInt(data.substring(0, 2)) < hour) {
                            atualHours.splice(index, 1);
                        };
                    });
                    if (atualHours.length ===1){
                        console.log(movies[index]['Horarios'][mapDay[day]]);
                    }
                });

            return res.render('index2', {movies: movies});
        });
    });

    app.get('/update', function(req, res){
        var cb = function (movies) {
            LastUpdate.findOne(function (err, data) {
                if(err) throw err;

                // //TODO - Melhorar o esquema de atualização
                // if(!data || data.DayOfWeek === 5){
                //     var date = new Date;
                //     var today = {
                //         'LastDate': date,
                //         'DayOfWeek': date.getDay()
                //     };
                //     LastUpdate.create(today, function (err, data) {

                //     })
                // }
                Movie.remove({}, function(err) { 
                    console.log('collection removed');
                        Movie.create(movies, function (err, movies) {
                            console.log(movies);
                            if (err) throw err;
                        });
                        res.send('Check your console!')
                });
                        

            });
        };
        crawler.updateListMovies(cb);
    });
};

