const express= require("express");
const router= express.Router({});

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError= require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const UserController = require("../controllers/users.js")

router.route("/signup")
.get(UserController.renderSignupform)
.post(wrapAsync(UserController.postRoute));

router.route("/login")
.get(UserController.renderLoginForm)
.post(
    saveRedirectUrl,
     passport.authenticate("local",{
    failureRedirect:'/login',
    failureFlash:true
}),UserController.login);
//signup
//post signup

//login
// router


//post login
// router


router.get("/logout",UserController.delete);

module.exports= router; 