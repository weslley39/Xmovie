var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    LastDate: {type: Date, required: true}
    , DayOfWeek: {type: Number, required: true}
});

module.exports = mongoose.model('lastUpdate', schema);