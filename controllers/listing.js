const axios = require("axios");
const listing = require("../models/listing");
const getCoordinates = require("../public/javascripts/map");

module.exports.index = async (req, res) => {
  try {
    const { location } = req.query;
    let alllistings;
    let message = null;
    if (location) {
      alllistings = await listing.find({
        location: { $regex: location, $options: "i" },
      });
      if (alllistings.length === 0) {
        message = `No listings found for "${location}"`;
      }
    } else {
      alllistings = await listing.find({});
    }
    res.render("listings/index", { alllistings, message });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports.newListing = async (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let id = req.params.id;
  const list = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "Listing You requested does not exist !");
    res.redirect("/listings");
  }

  res.render("listings/show", { list, currentUrl: req.originalUrl });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new listing(req.body.listing);
  // API call yaha insert karo
  const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: newlisting.location,
      format: "json",
      limit: 1,
    },
  });

  try {
    if (geoRes.data && geoRes.data.length > 0) {
      lat = geoRes.data[0].lat;
      lng = geoRes.data[0].lon;
    }
  } catch (err) {
    console.error("Geocoding failed:", err);
  }

  newlisting.coordinates = { lat, lng };

  // end

  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  await newlisting.save();
  req.flash("success", "New Listing Created !");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let id = req.params.id;
  const list = await listing.findById(id);
  if (!list) {
    req.flash("error", "Listing You requested does not exist !");
    res.redirect("/listings");
  }
  let originalImage = list.image.url;
  originalImage.replace("/uploads", "/upload/h_300,w_250");

  const redirectUrl = req.query.redirect || "/listings";
  res.render("listings/edit", { list, originalImage });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findByIdAndUpdate(id, { ...req.body.list });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    list.image = { url, filename };
    await list.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedList = await listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect(`/listings`);
};
