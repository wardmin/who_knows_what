var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
    
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
