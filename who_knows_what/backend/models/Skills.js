var mongoose = require('mongoose');

module.exports = mongoose.model('Skill',{
    name: String,
    level: String,
    belongsTo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        email: String,
    }
});
