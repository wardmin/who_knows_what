var UserSkillMapping = require('../models/userSkillMapping');

module.exports = {
    getOnePersonAllSkills: function (req, res) {
        UserSkillMapping.find({}).populate('user', '-pwd').exec(function (err, result) {
            res.send(result);
        })
    },
    getAllPeopleOneSkills: function (req, res) {
        UserSkillMapping.find({}).populate('user', '-pwd').exec(function (err, result) {
            res.send(result);
        })
    },
    post: function (req, res) {
        console.log(req.body, req.user);
        
        req.body.user = req.user;
        
        var userSkillMapping = new userSkillMapping(req.body);

        userSkillMapping.save();

        res.status(200);
    }
}
