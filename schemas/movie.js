var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
      Titulo: {type: String}
    , Url: {type: String}
    , Descricao: {type: String}
    , Img: {type: String}
    , DataInicial: {type: String}
    , DataFinal: {type: String}
    , Genero: {type: String}
    , Censura: {type: String}
    , Elenco: {type: String}
    , Diretor: {type: String}
    , Horarios: {
            Segunda: {type: String}
            , Terca: {type: String}
            , Quarta: {type: String}
            , Quinta: {type: String}
            , Sexta: {type: String}
            , Sabado: {type: String}
            , Domingo: {type: String}
    }
});

module.exports = mongoose.model('movie', schema);