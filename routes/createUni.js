var express = require('express');
var router = express.Router();

/* GET Create University page. */
router.get('/', function(req, res, next) {
    res.render('createUni', { isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin });
});

module.exports = router;
