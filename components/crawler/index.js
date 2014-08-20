var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

module.exports = {
    updateListMovies: function () {
        url = 'http://www.shoppingpatioguarulhos.com.br/cinema_lazer.php/';
        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var movies = [];
                var funcsToExecute = [];


                var getListOfMovies = function (asyncCb) {
                    $('.slides_container div a').each(function(index, elem){
                        movies.push({Titulo: $(this).find('img').attr('title'), Url: $(this).attr('href')});
                    });
                    asyncCb();
                };

                funcsToExecute['getListOfMovies'] = getListOfMovies;


                var getEachMovie = function (asyncCb) {
                    movies.forEach(function(movie, index){
                        console.log('Analisando filme: ' + movie.Titulo);
                        request(url + movie.Url, function(error, response, html){
                            if(!error){
                                var $ = cheerio.load(html);
                                movies[index].DataInicial = $('.verde13').eq(0).find('fo').text().substring(0, 10);
                                movies[index].DataFinal = $('.verde13').eq(1).find('fo').text().substring(0, 10);
                                movies[index].Genero = $('.verde13').eq(2).find('fo').text().substring(0, $('.verde13').eq(2).find('fo').text().indexOf("          "));
                                movies[index].Censura = $('.verde13').eq(3).find('fo').text();
                                movies[index].Elenco = $('.verde13').eq(4).find('fo').text();
                                movies[index].Diretor = $('.verde13').eq(5).find('fo').text();
                                movies[index].Horarios = [
                                    {"Segunda": $('.lista.c11').first().find('.horarios').eq(0).text()},
                                    {"Terca": $('.lista.c11').first().find('.horarios').eq(1).text()},
                                    {"Quarta": $('.lista.c11').first().find('.horarios').eq(2).text()},
                                    {"Quinta": $('.lista.c11').first().find('.horarios').eq(3).text()},
                                    {"Sexta": $('.lista.c11').first().find('.horarios').eq(4).text()},
                                    {"Sabado": $('.lista.c11').first().find('.horarios').eq(5).text()},
                                    {"Domingo": $('.lista.c11').first().find('.horarios').eq(6).text()}
                                ];
                            }
                            if ( movies.length === index + 1){
                                asyncCb();
                            }
                        });
                    });
                };
                funcsToExecute['getEachMovie'] = getEachMovie;

                async.auto(funcsToExecute, function (err, data) {
                    console.log(movies);
                })

            }
        });
    },




    getPrices: function () {
        url = 'http://www.shoppingpatioguarulhos.com.br/cinema_lazer.php/';
        request(url, function(error, response, html){
            if(!error) {
                var $ = cheerio.load(html);
                var horarios = [];
                if  (horarios.length === 0){
                    horarios.Segunda = [
                        $('.box.box_assista').find('.preco_valor').eq(0).text(),
                        $('.box.box_assista').find('.preco_valor').eq(1).text(),
                        $('.box.box_assista').find('.preco_valor').eq(2).text(),
                        $('.box.box_assista').find('.preco_valor').eq(3).text()
                    ];
                    horarios.Terca = [
                        $('.box.box_assista').find('.preco_valor').eq(4).text(),
                        $('.box.box_assista').find('.preco_valor').eq(5).text(),
                        $('.box.box_assista').find('.preco_valor').eq(6).text(),
                        $('.box.box_assista').find('.preco_valor').eq(7).text()
                    ];
                    horarios.Quarta = [
                        $('.box.box_assista').find('.preco_valor').eq(8).text(),
                        $('.box.box_assista').find('.preco_valor').eq(9).text(),
                        $('.box.box_assista').find('.preco_valor').eq(10).text(),
                        $('.box.box_assista').find('.preco_valor').eq(11).text()
                    ];
                    horarios.Quinta = [
                        $('.box.box_assista').find('.preco_valor').eq(12).text(),
                        $('.box.box_assista').find('.preco_valor').eq(13).text(),
                        $('.box.box_assista').find('.preco_valor').eq(14).text(),
                        $('.box.box_assista').find('.preco_valor').eq(15).text()
                    ];
                    horarios.Sexta = [
                        $('.box.box_assista').find('.preco_valor').eq(16).text(),
                        $('.box.box_assista').find('.preco_valor').eq(17).text(),
                        $('.box.box_assista').find('.preco_valor').eq(18).text(),
                        $('.box.box_assista').find('.preco_valor').eq(19).text()
                    ];
                    horarios.Sabado = [
                        $('.box.box_assista').find('.preco_valor').eq(20).text(),
                        $('.box.box_assista').find('.preco_valor').eq(21).text(),
                        $('.box.box_assista').find('.preco_valor').eq(22).text(),
                        $('.box.box_assista').find('.preco_valor').eq(23).text()
                    ];
                    horarios.Domingo = [
                        $('.box.box_assista').find('.preco_valor').eq(24).text(),
                        $('.box.box_assista').find('.preco_valor').eq(25).text(),
                        $('.box.box_assista').find('.preco_valor').eq(26).text(),
                        $('.box.box_assista').find('.preco_valor').eq(27).text()
                    ];
                }
            }
        });


    }
};