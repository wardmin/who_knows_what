var mongoose = require('mongoose');

module.exports = mongoose.model('UserSkillMapping',{
	user: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    skill: {type: mongoose.Schema.ObjectId, ref: 'Skills'},
    level: Number
})
