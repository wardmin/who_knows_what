var mongoose = require('mongoose');

module.exports = mongoose.model('Ratings',{
    
    user: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    fromUser: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    score: Number,
    comment: String
});
