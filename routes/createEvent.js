var express = require('express');
var router = express.Router();

/* GET Create Event page. */
router.get('/', function(req, res, next) {
  if(!req.session.loggedIn) {
    req.session.hasError = true;
    req.session.errorMessage = "You must be logged in to access that area!";
    res.redirect("/");
    return;
  }

  const apiKey = dbCredentials.google_api_key;
  const uniId = req.session.universityId;

  dbConnection.query(`SELECT * FROM Location WHERE universityId = ${uniId}`, (err, locations) => {
    if (err) throw err;

    dbConnection.query(`SELECT * FROM RSO WHERE RSO.isActive AND universityId = ${uniId}`, (err, rsos) => {
      res.render('createEvent', {
        apiKey: apiKey,
        locations: locations,
        activeRSO: rsos,
        isAdmin: req.session.isAdmin,
        isSuperAdmin: req.session.isSuperAdmin
      });
    });
  });
});

router.post('/', (req, res, next) => {
  const eventName = req.body.eventName;
  const locationId = req.body.locName;
  const eventCategory = req.body.eventCategory;
  const description = req.body.eventDes;
  const eventDateTime = req.body.eventDate + " " + req.body.eventTime + ":00";
  const contactPhone = req.body.phoneNum;
  const contactEmail = req.body.email;
  const schoolId = req.session.universityId;
  const eventVisibility = req.body.eventVisibility;

  const query =
      "INSERT INTO Event " +
      "(eventName, locationId, eventCategory, description, dateTime, contactPhone, contactEmail, schoolId, eventVisibility) " +
      `VALUES ("${eventName}", "${locationId}", "${eventCategory}", "${description}", "${eventDateTime}", "${contactPhone}", "${contactEmail}", "${schoolId}", "${eventVisibility}");`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    res.redirect('/createEvent');
  });
});

module.exports = router;
