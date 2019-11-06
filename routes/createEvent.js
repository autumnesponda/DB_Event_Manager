var express = require('express');
var router = express.Router();

/* GET Create Event page. */
router.get('/', function(req, res, next) {

    var apiKey = dbCredentials.google_api_key;

    dbConnection.query("SELECT * FROM University", (err, rows) => {
        if (err) throw err;

        const universities = rows;

    dbConnection.query("SELECT * FROM Location", (err, rows) => {
        if (err) throw err;

        const locations = rows;

        res.render('createEvent', { 
            apiKey: apiKey, 
            universities: universities,
            locations: locations,
            isAdmin: req.session.isAdmin, 
            isSuperAdmin: req.session.isSuperAdmin });

        });
    });
});



router.post('/', (req, res, next) => {
  console.log(req.body);
  const eventName = req.body.eventName;

  // const location = req.body.locName;
  // TODO: CONVERT THE ABOVE INTO AN ID OR SOMETHING OOF
  //  I'M SORRY THE LOCATION NAME MIGHT NOT BE UNIQUE
  //  an idea would be to make the value attr for each
  //  dropdown item be the id of the location instead of the name
  const locationId = 666;

  const eventCategory = req.body.eventCategory;
  const description = req.body.eventDes;
  const Time = req.body.eventTime;
  const theDate = req.body.eventDate;
  const dateTime = theDate + " " + Time;
  const contactPhone = req.body.phoneNum;
  const contactEmail = req.body.email;
  const schoolId = 666;
  const schoolName = "WE MUST DO SOMETHIGN HERE";
  const eventVisibility = req.body.eventVisibility;

  const query =
      "INSERT INTO Events " +
      "(eventName, locationId, eventCategory, description, dateTime, contactPhone, contactEmail, schoolId, schoolName, eventVisibility) " +
      `VALUES ("${eventName}", "${locationId}", "${eventCategory}", "${description}", "${dateTime}", "${contactPhone}", "${contactEmail}", "${schoolId}", "${schoolName}", "${eventVisibility}");`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    res.redirect('/createEvent');
  });
});

module.exports = router;
