var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
    dbConnection.query("SELECT * FROM Events", (err, rows) => {
      if (err) throw err;

      const events = rows;
      dbConnection.query("SELECT * FROM Comments", (err, rows) => {
        if (err) throw err;

        res.render('eventList', { events: events, comments: rows });
      });
    });
});

module.exports = router;
