var express = require('express');
var router = express.Router();

/* GET Create Location page. */
router.get('/', function(req, res, next) {
    const apiKey = dbCredentials.google_api_key;

    dbConnection.query("SELECT * FROM University", (err, rows) => {
        if (err) throw err;

        res.render('createLoc', {
            apiKey: apiKey,
            universities: rows,
            isAdmin: req.session.isAdmin, 
            isSuperAdmin: req.session.isSuperAdmin
        });
    });
});

router.post('/', (req, res, next) => {
    const lat = req.body.locLat;
    const long = req.body.locLong;
    const name = req.body.locName;
    const universityId = req.body.uniId;

    dbConnection.query('INSERT INTO Location (latitude, longitude, name, universityId) VALUES (?, ?, ?, ?)', [lat, long, name, universityId], (err, rows) => {
       if (err) throw err;

       // TODO: show success popover
       console.log("Event Created !");
       res.redirect('/eventList');
    });

});

module.exports = router;
