var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
	// TODO: pass session data (errors, acct creation success, etc.) to index page
	//  and have it render optional little messages
	if (req.session.loggedIn) {
		res.redirect('/eventList');
		return;
	}
	req.session.destroy();
  res.render('index');
});

router.post('/', function(req, res, next)
{
  var username = req.body.username;
  var password = req.body.password;

	console.log("WTF");

	dbConnection.query('SELECT * FROM Users WHERE Username = ?', [username], function(error, results, fields)
	{
		if (results.length == 1)
		{
			bcrypt.compare(password, results[0].Password, (err, matches) => {
				if (matches){
					req.session.hasError = false;
					req.session.errorMessage = "";
					req.session.loggedIn = true;
					req.session.username = username;
					req.session.isAdmin = results[0].IsAdmin;
					req.session.isSuperAdmin = results[0].IsSuperadmin;
					res.redirect('/eventList');
				}
				else {
					console.log("incorrect password");
					res.render('index');
				}
			});
		}
		else
		{
			console.log("username doesn't exist");
			res.render('index');
		}
	});
});

module.exports = router;
