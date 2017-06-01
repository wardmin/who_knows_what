var mongoose = require('mongoose');

module.exports = mongoose.model('userSkillMapping',{
	user: {type: mongoose.Schema.ObjectId, ref: 'users'},
    skill: {type: mongoose.Schema.ObjectId, ref: 'skills'}
})
