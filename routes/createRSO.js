var express = require('express');
var router = express.Router();

/* GET Create RSO page. */
router.get('/', function(req, res, next) {

    // Should RSO's have an array of members?

    const RSOs = [
        { 
            name: "Puppy Club",
            type: "Animal Rescue",
            RSOID: "rso01"
        },
        { 
            name: "Robotics Club",
            type: "Nerd Congregation",
            RSOID: "rso02"
        },
        { 
            name: "Marshmallow Club",
            type: "Foodie Club",
            RSOID: "rso03"
        }
    ];

    res.render('createRSO', { RSOs:RSOs });
});

module.exports = router;