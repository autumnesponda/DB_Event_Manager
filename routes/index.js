var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next)
{
  var username = req.body.username;
  var password = req.body.password;

	dbConnection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(error, results, fields)
  {

		if (results.length > 0)
    {
			req.session.loggedin = true;
			req.session.username = username;
			res.redirect('/idk');
		}
    else
    {
		//	res.send('Incorrect Username and/or Password!');
      res.render('index');
		}
		res.end();
	});
});
  // IF THE ACCOUNT INFORMATION MATCHES THE DB, RES.RENDER
  // TO A NEW PAGE, CAN BE A DUMMY PAGE FOR NOW

module.exports = router;
