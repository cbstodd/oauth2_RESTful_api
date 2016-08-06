// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var courseController = require('./controllers/course');
var userController = require('./controllers/users');
mongoose.connect('mongodb://localhost:27017/noobsee');
// TODO: localhost should be updated to production database

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

/*----------------------------------------
 FROM: controllers/... ROUTES API
 ----------------------------------------*/
// Create endpoint handlers for /courses
router.route('/courses')
  .post(courseController.postCourses)
  .get(courseController.getCourses);

// Create endpoint handlers for /courses/:course_id
router.route('/courses/:course_id')
  .get(courseController.getCourse)
  .put(courseController.putCourse)
  .delete(courseController.deleteCourse);

router.route('/users')
      .post(userController.postUsers)
      .get(userController.getUsers); //TODO: Remove for production
/*----------------------------------------
   EXPRESS SERVER
----------------------------------------*/
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('###= Express listening on http://localhost' + port + ' =###');
//Run node inspector: node-debug server.js
