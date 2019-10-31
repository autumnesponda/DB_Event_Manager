// TODO: WOKRING LOGOUT BUTTON

var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
  if(!req.session.loggedIn) {
    req.session.hasError = true;
    req.session.errorMessage = "You must be logged in to access that area!";
    res.redirect("/");
    return;
  }

  dbConnection.query("SELECT * FROM Events", (err, rows) => {
    if (err) throw err;

    const events = rows;
    dbConnection.query("SELECT * FROM Comments", (err, rows) => {
      if (err) throw err;

      res.render('eventList', { events: events, comments: rows, isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin});
    });
  });
});

module.exports = router;