// Who knows what v2 
var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport");
    
mongoose.connect("mongodb://localhost/who_knows");
app.use(bodyParser.urlencoded({extended: true}));






app.listen(process.env.PORT, process.env.IP, function(){
   console.log("who knows what is up."); 
});