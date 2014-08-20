var crawler = require('../components/crawler');

module.exports = exports = function(app){
    app.get('/', function(req, res, next){
        "use strict";
        return res.render('index');
    });

    app.get('/update', function(req, res){
        crawler.updateListMovies();
        console.log('chamou');
        
    });
};

