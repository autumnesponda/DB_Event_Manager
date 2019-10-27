var express = require('express');
var router = express.Router();

/* GET Create University page. */
router.get('/', function(req, res, next) {
    res.render('createUni');
});

module.exports = router;