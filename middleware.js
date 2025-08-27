const listing = require('./models/listing');
const review = require('./models/review');

module.exports.isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You Must be Logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await listing.findById(id);
  if (!list.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing so you cant handle it .");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req,res,next)=>{
  const { id,reviewId } = req.params;
  let newReview = await review.findById(reviewId);
  if (!newReview.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this review so you cant handle it .");
    return res.redirect(`/listings/${id}`);
  }
  next();
}