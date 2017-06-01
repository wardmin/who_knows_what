var Message = require('../models/userSkillMapping');

module.exports = {
    get: function (req, res) {
        UserSkillMapping.find({}).populate('user', '-pwd').exec(function (err, result) {
            res.send(result);
        })
    },
    post: function (req, res) {
        console.log(req.body, req.user);
        
        req.body.user = req.user;
        
        var userSkillMapping = new userSkillMapping(req.body);

        message.save();

        res.status(200);
    }
}
