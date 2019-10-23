var express = require('express');
var router = express.Router();

/* GET registration page. */
router.get('/', (req, res, next) => {
  var universityList = [];
  dbConnection.query("SELECT * FROM University", (err, rows) => {
    if (err) throw err;

    for (var i = 0; i < rows.length; i++) { universityList.push(rows[i].Name); }

    res.render('register', { universityList: universityList });
  });
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const university = req.body.university;
  const isAdmin = req.body.role == "admin";
  const isSuperAdmin = req.body.role == "superadmin";

  // this is ugly i know but so is sql baybeeee
  const query =
      "INSERT INTO Users " +
      "(Username, Password, Name, University, IsAdmin, IsSuperAdmin) " +
      `VALUES ("${username}", "${password}", "${name}", "${university}", ` +
      `${isAdmin}, ${isSuperAdmin});`;

  dbConnection.query(query, (err, rows) => {
    if (err) throw err;

    console.log("account created !");

    // TODO: maybe redirect to login with a variable and display a message
    //  that account creation was successful?
    //  session data would be the ticket for that
    //  or just straight to logged in area
    res.render('index');
  });
});

module.exports = router;
