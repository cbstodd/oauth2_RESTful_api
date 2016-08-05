// Dependencies
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
   ROUTES API
----------------------------------------*/
// Creates a new route with the prefix /courses
var coursesRoute = router.route('/courses');

// Create endpoint /api/courses for POSTS
coursesRoute.post(function(req, res) {
    // Create a new instance of the course model
    var course = new Course();

    // Set the course properties that came from the POST data
    course.progress = req.body.progress;
    course.imageUrl = req.body.imageUrl;
    course.experienceLevel = req.body.experienceLevel;
    course.language = req.body.language;
    course.description = req.body.description;
    course.title = req.body.title;

    // Save the course and check for errors
    course.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'New course created!',
            data: course
        });
    });
});

// Create endpoint /api/courses for GET all courses
coursesRoute.get(function(req, res) {
    // Use the Course model to find all courses
    Course.find(function(err, courses) {
        if (err)
            res.send(err);

        res.json(courses);
    });
});

// Creates a new route with the /courses/:course_id prefix
var coursesRoute = router.route('/courses/:course_id');

// Create endpoint /api/courses/:course_id for GET
coursesRoute.get(function(req, res) {
    // Use the Course model to find a specific course
    Course.findById(req.params.course_id, function(err, course) {
        if (err)
            res.send(err);

        res.json(course);
    });
});

// Create endpoint /api/courses/:courses_id for PUT
coursesRoute.put(function(req, res) {
    // Use the course model to find a specific course
    Course.findById(req.params.course_id, function(err, course) {
        if (err)
            res.send(err);

        // Update the existing course quantity
        course.progress = req.body.progress;
        course.imageUrl = req.body.imageUrl;
        course.experienceLevel = req.body.experienceLevel;
        course.language = req.body.language;
        course.description = req.body.description;
        course.title = req.body.title;

        // Save the course and check for errors
        course.save(function(err) {
            if (err)
                res.send(err);

            res.json(course);
        });
    });
});

// Create endpoint /api/courses/:course_id for DELETE
coursesRoute.delete(function (req, res) {
    // Use the Course model to find a specific course and remove it
    Course.findByIdAndRemove(req.params.course_id, function (err) {
        if (err)
        res.send(err);

        res.json({ message: "Course has been deleted!" });
    });
});


/*----------------------------------------
   EXPRESS SERVER
----------------------------------------*/


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('$$$ Express listening on http://localhost' + port + ' $$$');
//Run node inspector: node-debug server.js
