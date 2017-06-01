var Message = require('../models/ratings');

module.exports = {
    get: function (req, res) {
        Ratings.find({}).populate('user', '-pwd').exec(function (err, result) {
            res.send(result);
        })
    },
    post: function (req, res) {
        console.log(req.body, req.user);
        
        req.body.user = req.user;
        
        var message = new Message(req.body);

        message.save();

        res.status(200);
    }
}
