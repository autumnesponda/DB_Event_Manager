var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next)
{
  var username = req.body.username;
  var password = req.body.password;

	bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
		if (err) throw err;

		dbConnection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, hash], function(error, results, fields)
		{
			if (results.length > 0)
			{
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/eventList');
			}
			else
			{
				//	res.send('Incorrect Username and/or Password!');
				res.render('index');
			}
		});
	});
});


module.exports = router;
