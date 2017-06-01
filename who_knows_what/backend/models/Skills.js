var mongoose = require('mongoose');

module.exports = mongoose.model('Skills',{
    name: String,
    level: Number,
    belongsTo: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});
