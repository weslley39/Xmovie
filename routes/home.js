(function() {
    'use strict';
    var movieService = require('../services/movie.service.js');
    var PriceService = require('../services/price.service.js');
    var Movie = require('../schemas/movie');

    module.exports = exports = function(app, db){
        app.get('/loadData', function(req, res){
            var cb = function(movies) {
                res.contentType('json');
                res.send(movies);
            };
            movieService.getMovies(cb);
        });

        app.get('/getPrices', function(req, res, next) {
            var cb = function(prices) {
                res.contentType('json');
                res.send(prices);
            };
            PriceService.getPrices(cb);
        });

        app.get('/', function(req, res, next){
            return res.render('index');
        });
    };
})();
