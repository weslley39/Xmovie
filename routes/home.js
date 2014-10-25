(function() {
    'use strict';
    var movieService = require('../services/movie.service.js');

    module.exports = exports = function(app, db){
        app.get('/loadData', function(req, res){
            var cb = function(movies) {
                res.contentType('json');
                res.send(movies);
            };
            movieService.getMovies(cb);
        });

        app.get('/', function(req, res, next){
            return res.render('index');
        });
    };
})();
