const Listing= require("../models/listing");
const Review = require("../models/review");


module.exports.postroute= async (req,res)=>{
    console.log(req.params);
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author=req.user._id;
    console.log(req.body.review);
    console.log(listing);
    listing.reviews.push(newreview);
     await newreview.save();
     await listing.save();
     console.log("new review saved");
     req.flash('success','New review created!');
     res.redirect(`/listings/${listing._id}`);
 }

 module.exports.deleteReviewRoute=async (req,res)=>{
 
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted!');
    res.redirect(`/listings/${id}`);


}