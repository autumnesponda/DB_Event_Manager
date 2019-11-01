var express = require('express');
var router = express.Router();

/* GET Create Location page. */
router.get('/', function(req, res, next) {
    
    var apiKey = dbCredentials.google_api_key;

    dbConnection.query("SELECT * FROM University", (err, rows) => {
        if (err) throw err;
    
        const universities = rows;

        res.render('createLoc', {
            apiKey: apiKey,
            universities: universities,
            isAdmin: req.session.isAdmin, 
            isSuperAdmin: req.session.isSuperAdmin
        });
    });
});

module.exports = router;