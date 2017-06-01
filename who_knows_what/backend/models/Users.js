var mongoose = require('mongoose');

module.exports = mongoose.model('Users',{
    email: String,
    name: String,
    department: String,
    status: String,
    title: String,
    password: String,
    slackId: String,
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }
    ]
});
