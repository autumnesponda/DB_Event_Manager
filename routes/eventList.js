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

  const hasError = req.session.hasError;
  const errorMessage = req.session.errorMessage;
  const hasSuccess = req.session.hasSuccess;
  const successMessage = req.session.successMessage;

  req.session.hasError = false;
  req.session.errorMessage = "";
  req.session.hasSuccess = false;
  req.session.successMessage = "";

  const universityId = req.session.universityId;
  const studentId = req.session.studentId;

  dbConnection.query(getEventQuery(universityId, studentId), (err, events) => {
    if (err) throw err;

    dbConnection.query("SELECT * FROM Comment", (err, comments) => {
      if (err) throw err;

      dbConnection.query("SELECT * FROM University", (err, universities) => {
        if (err) throw err;
  
        dbConnection.query("SELECT * FROM Location", (err, locations) => {
          if (err) throw err;

          res.render('eventList', {
              events: events,
              comments: comments,
              universities: universities,
              locations: locations,
              username: req.session.username,
              isAdmin: req.session.isAdmin,
              isSuperAdmin: req.session.isSuperAdmin,
              hasError: hasError,
              errorMessage: errorMessage,
              hasSuccess: hasSuccess,
              successMessage: successMessage
          });
        });
      });
    });
  });
});

router.post('/comment', (req, res, next) => {
  const username = req.body.userName;
  const commentText = req.body.commentText;
  const eventId = req.body.eventId;

  const query =
      "INSERT INTO Comment " +
      "(name, body, eventId) " +
      `VALUES ("${username}", "${commentText}", "${eventId}");`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    res.redirect('/eventList');
  });
});


function getEventQuery(uniId, studentId) {
  return `SELECT * FROM Event WHERE eventVisibility='public'
  UNION
  SELECT * FROM Event WHERE eventVisibility='private' AND schoolId = ${uniId}
  UNION 
  SELECT Event.* FROM Event, RSOMember WHERE Event.eventVisibility='rso' AND Event.rsoId=RSOMember.rsoId AND RSOMember.userId = ${studentId}`;
}

module.exports = router;
