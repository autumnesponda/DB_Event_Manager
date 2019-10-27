var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
    res.render('createEvent');
});

module.exports = router;