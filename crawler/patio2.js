var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    url = 'http://www.shoppingpatioguarulhos.com.br/cinema_lazer.php/';
    

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var movies = [];
            console.log('Taking name of Movies and Urls');
            $('.slides_container div a').each(function(index, elem){
                movies.push({Titulo: $(this).find('img').attr('title'), Url: $(this).attr('href')});
            });

            console.log('Finalizado');


            movies.forEach(function(movie, index){
                console.log('Analisando filme: ' + movie.Titulo)
                request(url + movie.Url, function(error, response, html){
                    if(!error){
                        var $ = cheerio.load(html);
                        movies[index].DataInicial = $('.verde13').eq(0).find('fo').text().substring(0, 10);
                        movies[index].DataFinal = $('.verde13').eq(1).find('fo').text().substring(0, 10);
                        movies[index].Genero = $('.verde13').eq(2).find('fo').text().substring(0, $('.verde13').eq(2).find('fo').text().indexOf("          "));
                        movies[index].Censura = $('.verde13').eq(3).find('fo').text();
                        movies[index].Elenco = $('.verde13').eq(4).find('fo').text();
                        movies[index].Diretor = $('.verde13').eq(5).find('fo').text();
                    }
                });
            })



            
        }
    });
    res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;