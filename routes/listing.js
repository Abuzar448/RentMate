const express = require("express");
const router = express.Router();
const { ListingSchema } = require("../schema");
const listing = require("../models/listing");
const ExpressError = require("../utils/expressError");
const { isloggedIn } = require("../middleware");
const { isOwner } = require("../middleware");
const multer  = require('multer')
const {storage} = require('../cloudConfig');
const upload = multer({storage});


const listingController = require('../controllers/listing');

const validateListing = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// alllisting route , create listing route 

router.route('/')
.get(listingController.index)
.post(isloggedIn,upload.single('listing[image][url]'),listingController.createListing);


// show route , update route , delete route .
router.get("/new", isloggedIn,listingController.newListing);

router.route('/:id')
.get(listingController.showListing)
.put(isloggedIn,upload.single('list[image][url]'),listingController.updateListing)
.delete(isloggedIn,isOwner,listingController.deleteListing)



router.get("/:id/edit",isloggedIn,isOwner,listingController.editListing);

module.exports = router;
