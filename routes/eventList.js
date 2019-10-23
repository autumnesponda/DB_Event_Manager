var express = require('express');
var router = express.Router();

/* GET Event List page. */
router.get('/', function(req, res, next) {
    
    /* TEMPORARY HARDCODED DATA */
    const events = [
        {
            name: "Border Collie Festival",
            university: "University of Central Florida",
            eventid: "event01",
            time: "10-10-2020"
        },
        {
            name: "Caturday",
            university: "University of South Florida",
            eventid: "event02",
            time: "10-10-2020"
        },
        {
            name: "Movie Night",
            university: "Florida State University",
            eventid: "event03",
            time: "10-10-2020"
        },
        {
            name: "Crippling Debt Day",
            university: "Full Sail University",
            eventid: "event04",
            time: "10-10-2020"
        }
    ]
    /* END TEMPORARY HARDCODED DATA */

    res.render('eventList', { 
        events:events
    });
});

module.exports = router;