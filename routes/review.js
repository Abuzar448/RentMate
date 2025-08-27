const express = require('express');
const router = express.Router();
const review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const listing = require("../models/listing.js");
const { isloggedIn } = require("../middleware");
const { isOwner , isReviewAuthor } = require("../middleware");

const reviewController = require('../controllers/review.js');

const validateReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
}

// Creating Reviews

router.post("/:id/reviews", isloggedIn , validateReview ,reviewController.createReviews);

// deleting Reviews

router.delete('/:id/reviews/:reviewId',isloggedIn,isReviewAuthor,reviewController.deleteReviews);

module.exports = router;