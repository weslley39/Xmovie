var express = require('express');
var cons = require('consolidate');
var swig = require('swig');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');
var routes = require('./routes')

var pub = __dirname + '/src',
    view = __dirname + '/views';


mongoose.connect('mongodb://localhost/timecontrol', function(err){
    if (err) throw err;

    var app = express();
    app.use(express.static(pub));

    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.set('views', __dirname + '/views');
    app.set('view cache', false);
    swig.setDefaults({ cache: false });

    routes(app);

    app.listen(3000);
    console.log('The Magic Happens on port 3000');
});