var mongoose = require('mongoose');

module.exports = mongoose.model('Alias',{
    skill: {type: mongoose.Schema.ObjectId, ref: 'Skills'},
    alias: {type: mongoose.Schema.ObjectId, ref: 'Skills'}
});
