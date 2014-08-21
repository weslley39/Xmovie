var crawler = require('../components/crawler');
var Movie = require('../schemas/movie');
var LastUpdate = require('../schemas/lastUpdate');


module.exports = exports = function(app, db){
    app.get('/', function(req, res, next){
        "use strict";
        return res.render('index');
    });

    app.get('/update', function(req, res){

        var cb = function (movies) {


            LastUpdate.findOne(function (err, data) {
                if(err) throw err;

                if(!data){
                    var date = new Date
                    var today = {
                        'LastDate': date,
                        'DayOfWeek': date.getDay()
                    };
                    LastUpdate.create(today, function (err, data) {
                        
                    })
                }
               console.log(data);
            });

//            Movie.create(movies, function (err, movies) {
//                if (err) throw err;
//
//                console.log(movies);
//
//            });
        };



        crawler.updateListMovies(cb);
    });
};

