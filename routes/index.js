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

router.get('/logout', (req, res) => {
  console.log("clearing session: " + req.session);
  req.session.destroy();
  res.redirect('/');
});

router.post('/', function(req, res, next)
{
  const username = req.body.username;
  const password = req.body.password;

	dbConnection.query('SELECT * FROM User WHERE username = ?', [username], function(err, results, fields)
	{
		if (err) throw err;
		if (results.length == 1)
		{
			bcrypt.compare(password, results[0].password, (err, matches) => {
				if (matches){
				  const user = results[0];
				  dbConnection.query('SELECT * FROM University WHERE Name = ?', [user.universityName], (err, row) => {
				    if (err) throw err;
            req.session.hasError = false;
            req.session.errorMessage = "";
            req.session.loggedIn = true;
            req.session.username = username;
            req.session.universityName = user.universityName;
            req.session.universityId = row[0].id;
            req.session.isAdmin = user.isAdmin;
            req.session.isSuperAdmin = user.isSuperAdmin;
            res.redirect('/eventList');
          });
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
