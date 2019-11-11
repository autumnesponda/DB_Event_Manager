var express = require('express');
var router = express.Router();

/* GET Create RSO page. */
router.get('/', function(req, res, next) {
    if(!req.session.loggedIn) {
        req.session.hasError = true;
        req.session.errorMessage = "You must be logged in to access that area!";
        res.redirect("/");
        return;
    }

    const uniId = req.session.universityId;
    dbConnection.query(`SELECT * FROM RSO WHERE universityId = ${uniId};`, (err, RSOs) => {
        if (err) throw err;
        res.render('createRSO', { RSOs:RSOs, isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin});
    });
});

router.post('/join', (req, res, next) => {
    const rsoId = req.body.RSOid;
    const stuId = req.session.studentId;
    dbConnection.query(`INSERT INTO RSOMember (rsoId, userId) VALUE (${rsoId}, ${stuId});`, (err) => {
        if (err) throw err;

        // TODO: show success message
        console.log("joined an RSO!");
        res.redirect('/eventList');
    });
});

router.post('/create', (req, res, next) => {
    const name = req.body.rsoName;
    const type = req.body.rsoType;
    const uniId = req.session.universityId;

    dbConnection.query(`INSERT INTO RSO (universityId, name, type) VALUE (${uniId}, "${name}", "${type}");`, (err, rows) => {
       if (err) throw err;
       const rsoId = rows.insertId;
       const userId = req.session.studentId;

       console.log(`INSERT INTO RSOMember (rsoId, userId) VALUE (${rsoId}, ${userId});`);

       dbConnection.query(`INSERT INTO RSOMember (rsoId, userId) VALUE (${rsoId}, ${userId});`, (err) => {
           if (err) throw err;

           // TODO: pretty message that new rso creation was complete;
           res.redirect('/eventList');
       });
    });

});



module.exports = router;
