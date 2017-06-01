var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./backend/models/Users"),
    Skills = require("./backend/models/Skills");


mongoose.connect("mongodb://localhost/who_knows_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
// Users Schema
// var usersSchema = new mongoose.Schema({
//     name: String,
//     title: String,
//     status:  String,
//     skills: [
//         {
//             type.mongoose.Schema.Types.ObjectId,
//             ref: "skill"
//         }
//     ]
// });

// var User = mongoose.model("Users", usersSchema);


// Skills Schema
// var skillsSchema = new mongoose.Schema({
//     name: String,
//     level: String
// });

// var Skill = 

User.create({
    email: "carmen@wang.com",
    department: "Awesome",
    status: "The Carminions live",
    password: "jellyfish"
}, function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

app.get("/", function(req, res){
    res.render("home");
});

app.get("/search", function(req, res){
    res.render("search");
});

app.get("/login", function(req, res){
    res.render("login");
})
// profile route 
app.get("/profile", function(req, res){
    res.render("profile");
})



// api route
app.get("/api", function(req, res){
    res.send("The api is working.");
});

// catch all route * 
app.get("/*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Who knows what Server has started");
});
