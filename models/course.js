// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CourseSchema = new mongoose.Schema({
    progress: Number,
    imageUrl: String,
    experienceLevel: Number,
    language: String,
    description: String,
    title: String
});

// Export the Mongoose model
module.exports = mongoose.model('Course', CourseSchema);
