var crawler = require('../components/crawler');
var Movie = require('../schemas/movie');
module.exports = exports = function(app, db){
    app.get('/', function(req, res, next){
        "use strict";
        return res.render('index');
    });

    app.get('/update', function(req, res){

        var cb = function (movies) {
            console.log(movies);
            
            Movie.create(movies, function (err, movies) {
                if (err) throw err;

                console.log(movies);

            });
        };



        crawler.updateListMovies(cb);
    });
};

