var mongoose = require('mongoose');

module.exports = mongoose.model('Users',{
    email: String,
    name: String,
    department: String,
    status: String,
    password: String
});
