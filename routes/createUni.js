var express = require('express');
var router = express.Router();

/* GET Create University page. */
router.get('/', function(req, res, next) {
  if(!req.session.loggedIn) {
    req.session.hasError = true;
    req.session.errorMessage = "You must be logged in to access that area!";
    res.redirect("/");
    return;
  }
  res.render('createUni', { isAdmin: req.session.isAdmin, isSuperAdmin: req.session.isSuperAdmin });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const uniName = req.body.uniName;
  const uniLocation = req.body.uniLocation;
  const uniDesc = req.body.uniDesc;
  const numStudents = req.body.uniStudents;

  const query =
      "INSERT INTO University " +
      "(name, description, numberOfStudents, location) " +
      `VALUES ("${uniName}", "${uniDesc}", "${numStudents}", "${uniLocation}");`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    res.redirect('/createUni');
  });
});


module.exports = router;
