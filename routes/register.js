var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");

/* GET registration page. */
router.get('/', (req, res, next) => {
  const hasError = req.session.hasError;
  const errorMessage = req.session.errorMessage;

  req.session.hasError = false;
  req.session.errorMessage = "";

  var universityList = [];
  dbConnection.query("SELECT * FROM University", (err, rows) => {
    if (err) throw err;

    for (var i = 0; i < rows.length; i++) {
      universityList.push(rows[i].name);
    }

    res.render('register', { universityList: universityList, hasError: hasError, errorMessage: errorMessage });
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

  dbConnection.query('SELECT * FROM User WHERE username = ?', [username], (err,rows) => {
    if (err) throw err;

    if (rows.length != 0) {
      req.session.hasError = true;
      req.session.errorMessage = "An account with that username already exists!";
      res.redirect('/register');
    }
    else {
      bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        if(err) throw err;

        const query =
            "INSERT INTO User " +
            "(username, password, name, universityName, isAdmin, isSuperAdmin) " +
            `VALUES ("${username}", "${hash}", "${name}", "${university}", ` +
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
    }
  });
});

module.exports = router;
