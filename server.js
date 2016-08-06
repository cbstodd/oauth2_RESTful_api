// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var courseController = require('./controllers/course');
var userController = require('./controllers/users');
var passport  = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/noobsee');
// TODO: localhost should be updated to production database

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use the passport package
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

/*----------------------------------------
 FROM: controllers/... ROUTES API
 ----------------------------------------*/
// Create endpoint handlers for /courses
router.route('/courses')
  .post(authController.isAuthenticated, courseController.postCourses)
  .get(authController.isAuthenticated, courseController.getCourses);

// Create endpoint handlers for /courses/:course_id
router.route('/courses/:course_id')
  .get(authController.isAuthenticated, courseController.getCourse)
  .put(authController.isAuthenticated, courseController.putCourse)
  .delete(authController.isAuthenticated, courseController.deleteCourse);

// Create endpoint handlers for /users
router.route('/users')
      .post(userController.postUsers)
      .get(authController.isAuthenticated, userController.getUsers);
//TODO: Remove /users GET for production
/*----------------------------------------
   EXPRESS SERVER
----------------------------------------*/
// Register all our routes with /api
app.use('/api', router);

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Start the server
app.listen(port);
console.log('###= Express listening on http://localhost' + port + ' =###');
//Run node inspector: node-debug server.js
