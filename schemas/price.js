var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
      Segunda: {type: Array},
    Terca: {type: Array},
    Quarta: {type: Array},
    Quinta: {type: Array},
    Sexta: {type: Array},
    Sabado: {type: Array},
    Domingo: {type: Array}
});

module.exports = mongoose.model('price', schema);