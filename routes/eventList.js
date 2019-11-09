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

  dbConnection.query("SELECT * FROM Event", (err, rows) => {
    if (err) throw err;

    const events = rows;
    dbConnection.query("SELECT * FROM Comment", (err, rows) => {
      if (err) throw err;

      const comments = rows;
      dbConnection.query("SELECT * FROM University", (err, rows) => {
        if (err) throw err;
  
        const universities = rows;
        dbConnection.query("SELECT * FROM Location", (err, rows) => {
          if (err) throw err;
      
          const locations = rows;

      res.render('eventList', { 
          events: events, 
          comments: comments, 
          universities: universities,
          locations: locations,
          username: req.session.username,
          isAdmin: req.session.isAdmin, 
          isSuperAdmin: req.session.isSuperAdmin
          });
        });
      });
    });
  });
});

module.exports = router;
