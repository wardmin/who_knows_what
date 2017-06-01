var mongoose = require('mongoose');

module.exports = mongoose.model('ratings',{
    
    user: {type: mongoose.Schema.ObjectId, ref: 'users'},
    fromUser: {type: mongoose.Schema.ObjectId, ref: 'users'},
    skill: {type: mongoose.Schema.ObjectId, ref: 'skills'},
    score: Number,
    comment: String
});
