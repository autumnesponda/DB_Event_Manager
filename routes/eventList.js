var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
    var eventsList = [];

    dbConnection.query("SELECT * FROM Events", (err, rows) => {
      if (err) throw err;
      res.render('eventList', { events: rows });
    });
});

module.exports = router;
