const listing = require("../models/listing.js");
const review = require("../models/review.js");

module.exports.createReviews =  async (req, res) => {
  const id = req.params.id;
  const listReview = await listing.findById(id);
  const newReview = new review(req.body.review);
  newReview.author = req.user._id;
  listReview.reviews.push(newReview);
  await listReview.save();
  await newReview.save();
  req.flash('success','New Review Added');
  res.redirect(`/listings/${id}`);
}

module.exports.deleteReviews = async (req,res)=>{
  let {id,reviewId} = req.params;
  await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await review.findByIdAndDelete(reviewId);
  req.flash('success','Review Deleted');
  res.redirect(`/listings/${id}`);
}