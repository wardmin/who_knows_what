var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    email: String,
    firstName: String,
    lastName: String,
    department: String,
    password: String
});
