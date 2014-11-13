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
		updateService.needUpdate(function(need) {
			if(!need) return cb();
			if (need) {
				crawler.getPrices(function(prices) {
					Price.remove({}, function(err) { 
						Price.create(prices, function (err, movies) {
							if (err) throw err;
							cb();
						});
					});
				});
			}
		});
	}

	function getPrices (cb) {
		updatePrices(function() {
			Price.findOne(function(err, data) {
				if(err) throw err;
				var mapDay = {1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sabado', 0: 'Domingo'};
				var d = new Date();
				var day = d.getDay();
				cb(data[mapDay[day]]);
			});
		})
	}

})();

