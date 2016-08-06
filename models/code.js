/*------------------------------------------------
 STORES THE OAUTH CODE GENERATED ACCESS TOKENS
 ------------------------------------------------*/

// Load required packages
var mongoose = require('mongoose');


// TODO: should hash the auth code value
// Define our token schema
var CodeSchema = new mongoose.Schema({
    value:       { type: String, required: true },// Stores auth code
    redirectUri: { type: String, required: true },// Stores redirect token
    userId:      { type: String, required: true },
    clientId:    { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Code', CodeSchema);
