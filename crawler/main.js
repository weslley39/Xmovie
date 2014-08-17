var scraper = require('scraper');
scraper('http://www.shoppingpatioguarulhos.com.br/cinema_lazer.php', function(err, jQuery) {
    if (err) {throw err}

    jQuery('.header').each(function(index, data) {
        console.log(jQuery(this).text()+'\n');
    });
});