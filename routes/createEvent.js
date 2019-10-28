var express = require('express');
var router = express.Router();

/* GET Create Event page. */
router.get('/', function(req, res, next) {
    res.render('createEvent');
});

module.exports = router;