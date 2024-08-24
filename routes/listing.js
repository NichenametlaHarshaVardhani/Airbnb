// Require the Cloudinary library
// const cloudinary = require('cloudinary')


const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapasync.js");
const {listingSchema}= require("../schema.js");
const ExpressError= require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validatelisting}= require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js");


const upload = multer({ storage })



router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validatelisting,wrapAsync(listingController.createRoute))
// .post((req,res)=>{
//     res.send(req.file);
// });

router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showRoute))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting,wrapAsync(listingController.update))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.delete));

//create new route





//show route
// router.get("/:id",wrapAsync(listingController.showRoute));



//index route

// router.get("/",
//     wrapAsync(listingController.index));



//add new data into db (create Route)
// router.post("/",isLoggedIn,validatelisting,wrapAsync(listingController.createRoute));

//Edit the Route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.edit));

//update the route

// router.put("/:id",isLoggedIn,isOwner,validatelisting,wrapAsync(listingController.update));


//delete the route

// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.delete));

module.exports= router;