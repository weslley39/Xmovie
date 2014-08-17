var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var pub = __dirname + '/src',
    view = __dirname + '/views';

app.use(express.static(__dirname + "/views"));
app.use(bodyParser());
app.use(express.static(pub));
app.use(express.static(view));


app.listen(3000);
console.log("The Magic Happens on port 3000");