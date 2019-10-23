var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
    
    /* TEMPORARY HARDCODED DATA */
    const welcomeText = "Welcome to EJS"
    const uniNames = [
        "University of Central Florida",
        "University of South Florida",
        "Florida State University",
        "University of Florida",
        "University of Miami",
        "Full Sail University"
    ]
/*     const eventListData = {
        uniNames: uniNames, welcomeText
      } */
    /* END TEMPORARY HARDCODED DATA */

  res.render('eventList', {
    viewVariable: "I'm available in the view as 'viewVariable'"
  });
});

module.exports = router;