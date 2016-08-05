// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Course = require('./models/course');
// TODO: localhost should be updated to production database
mongoose.connect('mongodb://localhost:27017/noobsee');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing (should be deleted later)
// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({
        message: 'You have no courses!'
    });
});

/*----------------------------------------
   ROUTE CODE
----------------------------------------*/
// Create a new route with the prefix /beers
var coursesRoute = router.route('/courses');

// Create endpoint /api/beers for POSTS
coursesRoute.post(function(req, res) {
    // Create a new instance of the Beer model
    var course = new Course();

    // Set the beer properties that came from the POST data
    course.progress = req.body.progress;
    course.imageUrl = req.body.imageUrl;
    course.experienceLevel = req.body.experienceLevel;
    course.language = req.body.language;
    course.description = req.body.description;
    course.title = req.body.title;

    // Save the beer and check for errors
    course.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'New course created!',
            data: course
        });
    });
});


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('$$$ Express listening on http://localhost' + port + ' $$$');

/*----------------------------------------
   Run node inspector: node-debug server.js
----------------------------------------*/
