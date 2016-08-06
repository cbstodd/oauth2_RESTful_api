// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var courseController = require('./controllers/course');
var userController = require('./controllers/users');
var clientController = require('./controllers/client');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

mongoose.connect('mongodb://localhost:27017/noobsee');
// TODO: localhost should be updated to production database

// Create our Express application
var app = express();

//Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret:            'Super Secret Session Key',
    saveUninitialized: true,
    resave:            true
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

// Create endpoint handlers for /clients
router.route('/clients')
      .post(authController.isAuthenticated, clientController.postClients)
      .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
      .get(authController.isAuthenticated, oauth2Controller.authorization)
      .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
      .post(authController.isClientAuthenticated, oauth2Controller.token);


/*------------------------------------------------
 Oauth test route:
 http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000

 ------------------------------------------------*/


/*----------------------------------------
 EXPRESS SERVER
 ----------------------------------------*/
// Register all our routes with /api
app.use('/api', router);

// Use environment defined port or 3000
// var port = process.env.PORT || 3000;

// Start the server
app.listen(3000);
console.log('###= Express listening on http://localhost3000 =###');
//Run node inspector: node-debug server.js
