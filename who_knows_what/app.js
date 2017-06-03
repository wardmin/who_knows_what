var express = require("express"),
    app = express(),
    router = express.Router(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require('passport-local').Strategy,
    expressSession = require('express-session'),
    User = require("./backend/models/Users"),
    Skill = require("./backend/models/Skills");


mongoose.connect("mongodb://localhost/who_knows_app");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set("view engine", "ejs");

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var userID;


// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


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

// app.get("/login", function(req, res){
    
// });

app.get('/login', function(req,res){
   res.render("login");
});

app.get('/register', function(req,res){
   res.render("register");
});


// profile route 
app.get("/users/:id", function(req, res){
    User.findById(req.params.id).populate("skills").exec(function(err, foundUser){
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
app.get("/users/:id/skills/new", function(req, res){
    // find user by id
    console.log(req.params.id);
    User.findById(req.params.id).populate("skills").exec(function(err, foundUser){
        if(err){
            console.log(err); 
        } else {
             res.render("skills/new", {user: foundUser});
        }
    })
});

app.post("/users/:id/skills", function(req, res){
    User.findById(req.params.id, function(err, user){
       if(err){
           console.log(err);
           console.log(req.params);
           res.redirect("back");
       } else {
           console.log(req.body)
            Skill.create(req.body.skills, function(err, skill){
           if(err){
               console.log(err);
           } else {
               console.log(req.body)
               //add userId and id to comment
               skill.belongsTo.id = req.params.id
               skill.belongsTo.email = user.email;
               //save comment
               skill.save();
               user.skills.push(skill);
               user.save();
               console.log(skill);
               res.redirect('/users/' + user._id);
           }
        });
       }
   });
})






// api route
app.get("/api/:skill", function(req, res){
    User.find({"knowledge": {'$regex': req.params.skill }}, function(err, allUsers){
        if(err){
            console.log(err);
        } else {
            res.send({users:allUsers});
        } 
    });
});

app.get("/api/test/:skill", function(req, res){
    var query = Skill.find({'name': req.params.skill });
    console.log("This is " + query);
    Skill.find({name: req.params.skill }, function(err, allSkills){
        console.log("This is req.params: " + req.params.skill);
        
        if(err){
            console.log(req.params);
            console.log(err);
        } else {
            console.log(allSkills);
            var found = {}
            allSkills.forEach(function(skill){
                console.log("This is skill.id: " + skill.id);
                User.findById(skill.id).populate("user").exec(function(err, foundUser){
                if(err){
                    res.redirect("back");
                } else {
                    console.log("this is foundUser " + foundUser);
                    console.log("this is found " + found)
                    // foundUser.push(found);
                }
                res.send(found);
                });
            });
        };
    });
});
    
    // User.findById(req.params.id).populate("skills").exec(function(err, foundUser)
//   Skill.find({"name": req.params.skill }, function(err, allSkills){
//         if(err){
//             console.log(req.params);
//             console.log(err);
//         } else {
//             console.log(allSkills[0]._id);
//             var allUsers= {};
//             allSkills.forEach(function(skill){
//                 User.findById(skill._id, function(err, foundUser){
//                     console.log(skill._id);
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(foundUser);
//                     foundUser.push(allUsers);
//                 }
//                 res.send(allUsers);
//         })
//   });
//         }
       
//   })});
   
   
app.post("/api/login", function(req, res){
    console.log(req.body)
    User.findOne({ email: req.body.email },function(err,result){
        if(err){
            console.log(err);
        } else {
            console.log(result)
            if(result.password === req.body.password) {
                res.redirect("/users/" + result.id);
            } else { 
                userID = result._id;
            res.redirect("/login");
            }
        }
    });
}); 

app.post("/api/register", function(req, res){
    console.log(req.body)
    User.findOne({ email: req.body.email },function(err,result){
        if(err){
            console.log(err);
        } else {
            console.log(result)
            if(result.email === req.body.email) {
                console.log("user already exist");
            }
        }
    });
    
    var users = new User();
    users.email = req.body.email;
    users.name = req.body.name;
    users.department = req.body.department;
    users.password = req.body.password;
    users.status = "";
    users.title = "";
    users.slackID = "";
    users.knowledge = "";
    users.rating = "";
    users.image = "";
   users.save(function(err, users){
        if(err) return err;
        res.send(users); 
        //console.log(users.id);
       res.redirect("/users/" + users.id);
    });
    
    // User.findOne({ email: req.body.email },function(err,result){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.redirect("/users/" + result.id);
    //     }
    // });
}); 



// api route
app.get("/ratings/", function(req, res){
    User.find({}, function(err){
        if(err){
            console.log(err);
        } else {
            res.send("test")
            // res.render("ratings", {users:allUsers});
        } 
    });
});




// catch all route * 
app.get("/*", function(req, res) {
    res.send("this is a test message");
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Who knows what Server is running....");
});
