(function() {
	'use strict';
	var crawler = require('../components/crawler');
	var Price = require('../schemas/price');
	var LastUpdate = require('../schemas/lastUpdate');
	var updateService = require('../services/update.service.js');


	module.exports = {
		updatePrices: updatePrices,
		getPrices: getPrices
	};


	function updatePrices (cb) {
		// updateService.needUpdate(function(need) {
			// if(!need) return cb();
			// if (need) {
				crawler.getPrices(function(prices) {
					Price.create(prices, function (err, movies) {
						if (err) throw err;
						cb();
					});
				});
			// }
		// });
	}

	function getPrices (cb) {
		Price.findOne(function(err, data) {
			if(err) throw err;
			console.log(data);
			cb(data);
		});
	}

})();
