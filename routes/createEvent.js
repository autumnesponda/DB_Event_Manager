var express = require('express');
var router = express.Router();

/* GET Create Event page. */
router.get('/', function(req, res, next) {

    var apiKey = dbCredentials.google_api_key;

    res.render('createEvent', { apiKey:apiKey, isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin });
});



router.post('/', (req, res, next) => {
  console.log(req.body);
  const eventName = req.body.eventName;
  const location = req.body.locName;
  const eventCategory = req.body.eventCategory;
  const description = req.body.eventDes;
  const Time = req.body.eventTime;
  const theDate = req.body.eventDate;
  const dateTime = theDate + Time;
  const contactPhone = req.body.phoneNum;
  const contactEmail = req.body.email;
  const schoolId = 666;
  const schoolName = "WE MUST DO SOMETHIGN HERE";
  const eventVisibility = req.body.eventVisibility;

  console.log(eventCategory);

  const query =
      "INSERT INTO Events " +
      "(eventName, location, eventCategory, description, dateTime, contactPhone, contactEmail, schoolId, schoolName, eventVisibility) " +
      `VALUES ("${eventName}", "${location}", "${eventCategory}", "${description}", "${dateTime}", "${contactPhone}", "${contactEmail}", "${schoolId}", "${schoolName}", "${eventVisibility}");`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    //res.render('createEvent');
  });
});

module.exports = router;
