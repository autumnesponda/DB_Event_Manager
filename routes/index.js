var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  // ADAM THIS IS WHERE YOU DO EVERYTHING TO LOG IN

  // IF THE ACCOUNT INFORMATION MATCHES THE DB, RES.RENDER
  // TO A NEW PAGE, CAN BE A DUMMY PAGE FOR NOW
});

module.exports = router;
