var express = require('express');
var router = express.Router();

/* GET Create Event page. */
router.get('/', function(req, res, next) {

    var apiKey = dbCredentials.google_api_key;

    res.render('createEvent', { apiKey:apiKey, isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin });
});

module.exports = router;
