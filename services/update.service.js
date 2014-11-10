(function() {
	'use strict';
	var LastUpdate = require('../schemas/lastUpdate');


	module.exports = {
		needUpdate: needUpdate
	};


	function needUpdate (cb) {
		LastUpdate.findOne(function (err, data) {
			if(err) throw err;
			var date = new Date();
			var daysPassed;

			if (data) {
				daysPassed = Math.abs(date.getTime() - new Date(data.LastDate).getTime());
				daysPassed = Math.floor(daysPassed / (1000 * 3600 * 24)); 
			} else {
				daysPassed = 8;
			}
			if(daysPassed >= 7){
				var today = {
					'LastDate': date,
					'DayOfWeek': date.getDay()
				};
				LastUpdate.remove({}, function(err) { 
					LastUpdate.create(today, function (err, data) {
						cb(true);
					});
				});
			} else {
				cb(false);
			}

		});
	}

})();
