var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res){

	var query = req.body.sql;

	switch(query){
		case "select * from table": 
			res.json({
				success: true,
				verb: "GET table/_search",
				queryDSL: { 
					query: { 
						match_all: {} 
					} 
				}
			});
			break;
		default:
			res.json({
				success: false,
				message: "Query cannot be converted."
			});
	}

});

module.exports = router;
