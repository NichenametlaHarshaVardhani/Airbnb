const express = require("express");
const app = express();
const users = require("./users.js");
const cookieParser= require("cookie-parser");
const session = require("express-session");
const flash= require("connect-flash");
const path= require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(cookieParser("secretcode"));
//use to create session ids in browsers of users laptops
app.use(session({secret:"mynewsecret",resave:false,saveUninitialized:true}));
app.use(flash());



app.get("/register",(req,res)=>{
    let {name="anonymous"}= req.query;
    req.session.name= name;
    console.log(req.session.name);
    req.flash('success','user registered');
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.messages=req.flash('success');
    res.render("page.ejs",{name:req.session.name});
});










// app.get("/reqcnt",(req,res)=>{
//     if(req.session.count)
//         {
//             req.session.count++;
//         }
//         else
//         {
//             req.session.count=1;
//         }
//     res.send(`you sent this many times ${req.session.count} request`);

// });




// app.get("/test",(req,res)=>{
//     res.send("successful");
// });

//users
app.use("/users",users);





app.listen(8080,()=>{
    console.log("server is on");
});