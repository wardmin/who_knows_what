var mongoose = require('mongoose');

module.exports = mongoose.model('alias',{
    skill: {type: mongoose.Schema.ObjectId, ref: 'skills'},
    alias: {type: mongoose.Schema.ObjectId, ref: 'skills'}
});
