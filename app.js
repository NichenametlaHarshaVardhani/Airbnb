if(process.env.NODE_ENV != "production")
{
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose= require("mongoose");
const port= 8080;
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapasync.js")
const ExpressError= require("./utils/ExpressError.js")
// const {listingSchema,reviewschema}= require("./schema.js");
// const Review = require("./models/review.js");
const listingRouter = require("./routes/listing.js")
const reviewRouter= require("./routes/review.js");
const userRouter= require("./routes/user.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }

const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions= {
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};





main().then(()=> console.log("connected to db"))
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.use(session(sessionOptions));
app.use(flash());




//passport

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    res.locals.curruser= req.user;
    // console.log(res.locals.success);
    next();
});










//demo user ke liye route

app.get("/demouser",async(req,res)=>{
    let user = new User({
        email:"abc@gmail.com",
        username:"student1"
    });
   let registereduser=await User.register(user,"student123");
   res.send(registereduser);
});



app.use("/listings",(req,res,next)=>{
console.log("middleware hits");
next();
},listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//get for home route

app.get("/",(req,res)=>{
    res.send("Welcome");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found")); 
});

app.use((err,req,res,next)=>{
   
    let { statusCode=500, message="something went wrong" }= err;
    res.status(statusCode).render("error.ejs",{message});
});


//starting the server

app.listen(port,()=>{
    console.log("listening");
});