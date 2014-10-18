var crawler = require('../components/crawler');
var Movie = require('../schemas/movie');
var LastUpdate = require('../schemas/lastUpdate');
var movieService = require('../services/movie.service.js');


module.exports = exports = function(app, db){
    app.get('/loadData', function(req, res){
        var cb = function(movies) {
            res.contentType('json');
            res.send(movies)
        }
        movieService.getMovies(cb);
    });

    app.get('/', function(req, res, next){
        return res.render('index');
    });

    app.get('/update', function(req, res){
        var cb = function (movies) {
            LastUpdate.findOne(function (err, data) {
                if(err) throw err;
                var date = new Date();
                var daysPassed;

                if (data) {
                    daysPassed = Math.abs(date.getTime() - new Date(data.LastDate).getTime());
                    daysPassed = Math.floor(daysPassed / (1000 * 3600 * 24)); 
                } else {
                    daysPassed = 8;
                }
                    //TODO - Melhorar o esquema de atualização
                    if(daysPassed >= 7){
                        var today = {
                            'LastDate': date,
                            'DayOfWeek': date.getDay()
                        };
                        LastUpdate.create(today, function (err, data) {

                        })
                    } else {

                    }



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

