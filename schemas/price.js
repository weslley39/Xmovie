var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	Segunda: [String],
	Terca: [String],
	Quarta: [String],
	Quinta: [String],
	Sexta: [String],
	Sabado: [String],
	Domingo: [String]
});

module.exports = mongoose.model('price', schema);