var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./backend/models/Users"),
    Skills = require("./backend/models/Skills");


mongoose.connect("mongodb://localhost/who_knows_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
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

app.get("/", function(req, res){
    res.render("home");
});

app.get("/search", function(req, res){
    res.render("search");
});

app.get("/login", function(req, res){
    res.render("login");
});

// profile route 
app.get("/users/:id", function(req, res){
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
            res.render("profile",{user:foundUser});
        }
    });
});

// EDIT USER
app.get("/users/:id/edit", function(req, res){
      User.findById(req.params.id).exec(function(err, foundUser){
        if(err){
            res.redirect("back");
        } else {
            res.render("users/edit", {user:foundUser});
      }
    });
});

app.post("/users/:id", function(req, res){
     User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           res.redirect("/users");
           console.log(req.params);
       } else {
           //redirect to the show page
           res.redirect("/users/" + req.params.id);
           console.log(req.params.id);
       }
    });
});



app.get("/users/", function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("users", {users:allUsers});
        } 
    });
});

// SKILLS Routing
// Skills New
app.get("/skills/", function(req, res){
    res.send("you are here");
    // // find campground by id
    // console.log(req.params.id);
    // User.findById(req.params.id, function(err, user){
    //     if(err){
    //         console.log(err);
    //     } else {
    //          res.render("/skills/new", {user: user});
    //     }
    // })
});

app.post("users/:id/skill", function(req, res){
    User.findById(req.params.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Skills.create(req.body.skill, function(err, skill){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               skill.author.id = req.user._id;
               skill.author.username = req.user.username;
               //save comment
               skill.save();
               User.skill.push(skill);
               User.save();
               console.log(skill);
               res.redirect('/users/' + user._id);
           }
        });
       }
   });
})





// api route
app.get("/api/:skill", function(req, res){
    Skills.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.send({users:allUsers});
        } 
    });
});

// api route
app.get("/ratings/", function(req, res){
    User.find({}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.render("ratings", {users:allUsers});
        } 
    });
});




// catch all route * 
app.get("/*", function(req, res) {
    res.send("this is a test message");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Who knows what Server has started");
});
