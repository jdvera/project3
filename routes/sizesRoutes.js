var db = require("../models");
var Sequelize = require('sequelize');

module.exports = function(app) {
	var Op = Sequelize.Op;

	app.get("/api/sizes/:gender/:measurement/:brand", function(req, res) {
		console.log("included brand\n------------");
		console.log(req.params);
		db.Sizes.findOne({
			where: {
				brand: req.params.brand,
				gender: req.params.gender,
				inchMin: { [Op.lte]: req.params.measurement},
				inchMax: { [Op.gte]: req.params.measurement }
			}
		}).then(function(dbSizes) {
			console.log("\nresults\n----------");
			console.log(dbSizes);
			res.json([{ brand: "Nike", gender: "male", size: "10" }, { brand: "Adidas", gender: "male", size: "10" }]);
		});
	});

	app.get("/api/sizes/:gender/:measurement", function(req, res) {
		console.log("no brand\n------------");
		console.log(req.params);
		db.Sizes.findAll({
			where: {
				gender: req.params.gender,
				inchMin: { [Op.lte]: req.params.measurement },
				inchMax: { [Op.gte]: req.params.measurement }
			}
		}).then(function(dbSizes) {
			console.log("\nresults\n----------");
			console.log(dbSizes.length);
			res.json(dbSizes);
		});
	});

	// app.post("/api/sizes", function(req, res) {
	// 	db.Sizes.findOne({ where: { brand: req.body.brand, size: req.body.size } }).then(function(response) {
	// 		if(!user) {
	// 			db.Sizes.create(req.body).then(function(dbSizes) {
	// 				res.json(dbSizes);
	// 			});
	// 		}
	// 		else {
	// 			res.send(false);
	// 		}
	// 	});
	// });
};