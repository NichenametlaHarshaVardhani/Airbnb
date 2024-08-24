const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapasync.js")
const ExpressError= require("../utils/ExpressError.js")
const {reviewschema}= require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor}= require("../middleware.js");

const reviewcontroller = require("../controllers/reviews.js")


//Reviews

//post route 
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewcontroller.postroute));
 
 
 //delete the review
 
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewcontroller.deleteReviewRoute ));

 module.exports = router;