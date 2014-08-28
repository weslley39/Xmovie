var crawler = require('../components/crawler');
var Movie = require('../schemas/movie');
var LastUpdate = require('../schemas/lastUpdate');


module.exports = exports = function(app, db){
    app.get('/', function(req, res, next){
        "use strict";

        Movie.find(function (err, movies) {
            return res.render('index', {movies: movies});
        });
    });

    app.get('/update', function(req, res){
        var cb = function (movies) {
            LastUpdate.findOne(function (err, data) {
                if(err) throw err;

                //TODO - Melhorar o esquema de atualização
                if(!data || data.DayOfWeek === 5){
                    var date = new Date;
                    var today = {
                        'LastDate': date,
                        'DayOfWeek': date.getDay()
                    };
                    LastUpdate.create(today, function (err, data) {
                        Movie.create(movies, function (err, movies) {
                            if (err) throw err;
                        });
                    })
                }
                res.send('Check your console!')

            });
        };
        crawler.updateListMovies(cb);
    });
};

