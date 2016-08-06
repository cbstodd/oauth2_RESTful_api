// Load required packages
var mongoose = require('mongoose');

/*------------------------------------------------
 value: is the actual token value used when accessing
 the API on behalf of the user
 ------------------------------------------------*/

 // TODO: Should hash the value:
// Define our token schema
var TokenSchema = new mongoose.Schema({
    value:    { type: String, required: true },
    userId:   { type: String, required: true },
    clientId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);
