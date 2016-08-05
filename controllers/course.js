// Load required packages
var Course = require('../models/course');

// Create endpoint /api/courses for POSTS
exports.postCourses = function(req, res) {
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
};

// Create endpoint /api/courses for GET all courses
exports.getCourses = function(req, res) {
    // Use the Course model to find all courses
    Course.find(function(err, courses) {
        if (err)
            res.send(err);

        res.json(courses);
    });
};



// Create endpoint /api/courses/:course_id for GET
exports.getCourse = function(req, res) {
    // Use the Course model to find a specific course
    Course.findById(req.params.course_id, function(err, course) {
        if (err)
            res.send(err);

        res.json(course);
    });
};

// Create endpoint /api/courses/:courses_id for PUT
exports.putCourse = function(req, res) {
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
};

// Create endpoint /api/courses/:course_id for DELETE
exports.deleteCourse = function (req, res) {
    // Use the Course model to find a specific course and remove it
    Course.findByIdAndRemove(req.params.course_id, function (err) {
        if (err)
            res.send(err);

        res.json({ message: "Course has been deleted!" });
    });
};

